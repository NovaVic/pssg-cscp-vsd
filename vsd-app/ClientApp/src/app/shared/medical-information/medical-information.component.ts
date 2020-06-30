import { OnInit, Component, Input } from "@angular/core";
import { FormBase } from "../form-base";
import { MatDialog, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material";
import { FormArray, FormGroup, Validators, FormBuilder, ControlContainer, FormControl } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MY_FORMATS, ApplicationType } from "../enums-list";
import { COUNTRIES_ADDRESS } from "../address/country-list";
import { HOSPITALS } from "../hospital-list";

@Component({
    selector: 'app-medical-information',
    templateUrl: './medical-information.component.html',
    styleUrls: ['./medical-information.component.scss'],
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class MedicalInformationComponent extends FormBase implements OnInit {
    @Input() formType: number;
    public form: FormGroup;
    ApplicationType = ApplicationType;

    familyDoctorNameItem: FormControl;

    otherTreatmentItems: FormArray;
    showAddProvider: boolean = true;
    showRemoveProvider: boolean = false;

    provinceList: string[];
    hospitalList = HOSPITALS;

    showOtherProvider: boolean[] = [];

    otherTreatmentLabel: string = "";

    constructor(
        private controlContainer: ControlContainer,
        private matDialog: MatDialog,
        private fb: FormBuilder,
    ) {
        super();
        var canada = COUNTRIES_ADDRESS.filter(c => c.name.toLowerCase() == 'canada')[0];
        this.provinceList = canada.areas;
    }

    ngOnInit() {
        this.form = <FormGroup>this.controlContainer.control;
        console.log("medical info component");
        console.log(this.form);

        if (this.formType === ApplicationType.Victim_Application) {
            this.otherTreatmentLabel = "Have you seen any other doctors, specialists, or counsellors who have been treating you for injuries resulting from the incident?";
        }
        else {
            this.otherTreatmentLabel = "Do you have a counsellor/therapist who has been treating you as a result of the incident?";
        }

        if (this.formType === ApplicationType.Victim_Application || this.formType === ApplicationType.IFM_Application) {
            this.form.get('wereYouTreatedAtHospital').valueChanges.subscribe(value => {
                let hospitalControl = this.form.get('treatedAtHospitalName');

                hospitalControl.clearValidators();
                hospitalControl.setErrors(null);

                let useValidation = value === true;
                if (useValidation) {
                    hospitalControl.setValidators([Validators.required]);
                }

                hospitalControl.updateValueAndValidity();
            });
        }

        //TODO - setup other change detection required field validation
    }

    addProvider(): void {
        // add a medical treatment provider to the list
        this.otherTreatmentItems = this.form.get('otherTreatments') as FormArray;
        this.otherTreatmentItems.push(this.createTreatmentItem());
        this.showAddProvider = this.otherTreatmentItems.length < 5;
        this.showRemoveProvider = this.otherTreatmentItems.length > 1;

        this.showOtherProvider.push(false);
    }
    clearProviders(): void {
        // remove all providers
        this.otherTreatmentItems = this.form.get('otherTreatments') as FormArray;
        while (this.otherTreatmentItems.length > 0) {
            this.otherTreatmentItems.removeAt(this.otherTreatmentItems.length - 1);
        }

        this.showOtherProvider = [];
    }

    removeProvider(index: number): void {
        // when the user clicks to remove the medical provider this removes the provider at the index clicked
        this.otherTreatmentItems = this.form.get('otherTreatments') as FormArray;
        this.otherTreatmentItems.removeAt(index);
        this.showAddProvider = this.otherTreatmentItems.length < 5;
        this.showRemoveProvider = this.otherTreatmentItems.length > 1;

        this.showOtherProvider.splice(index, 1);
    }

    createTreatmentItem(): FormGroup {
        // make a form group for insertion into the form
        return this.fb.group({
            providerType: [''],   // 100000001 = Specialist, 100000002 = Counsellor/Psychologist, 100000003 = Dentist, 100000004 = Other
            providerTypeText: [''],
            providerName: ['', Validators.required],
            providerPhoneNumber: [''],
            providerAddress: [''],
            //      providerAddress: this.fb.group({
            //        line1: [''],
            //        line2: [''],
            //        city: [''],
            //        postalCode: [''],  // , [Validators.pattern(postalRegex)]
            //        province: [{ value: 'British Columbia', disabled: false }],
            //        country: [{ value: 'Canada', disabled: false }],
            //      }),
        });
    }

    addDoctor(): void {
        this.familyDoctorNameItem = this.form.get('familyDoctorName') as FormControl;
        this.familyDoctorNameItem.enable();
        this.familyDoctorNameItem.setValidators([Validators.required]);// .validator = Validators.required;
    }

    clearDoctor(): void {
        this.familyDoctorNameItem = this.form.get('familyDoctorName') as FormControl;
        this.familyDoctorNameItem.disable();
        this.familyDoctorNameItem.setValidators(null);
    }

    showOtherProviderInput(index: number) {
        this.showOtherProvider[index] = true;
    }

    hideOtherProviderInput(index: number) {
        this.showOtherProvider[index] = false;
    }

}