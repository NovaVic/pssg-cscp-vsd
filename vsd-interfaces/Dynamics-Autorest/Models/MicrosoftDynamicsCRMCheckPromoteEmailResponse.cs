// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace Gov.Jag.VictimServices.Interfaces.Models
{
    using Newtonsoft.Json;
    using System.Linq;

    /// <summary>
    /// CheckPromoteEmailResponse
    /// </summary>
    public partial class MicrosoftDynamicsCRMCheckPromoteEmailResponse
    {
        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMCheckPromoteEmailResponse class.
        /// </summary>
        public MicrosoftDynamicsCRMCheckPromoteEmailResponse()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMCheckPromoteEmailResponse class.
        /// </summary>
        public MicrosoftDynamicsCRMCheckPromoteEmailResponse(bool? shouldPromote = default(bool?), int? reasonCode = default(int?))
        {
            ShouldPromote = shouldPromote;
            ReasonCode = reasonCode;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ShouldPromote")]
        public bool? ShouldPromote { get; set; }

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "ReasonCode")]
        public int? ReasonCode { get; set; }

    }
}