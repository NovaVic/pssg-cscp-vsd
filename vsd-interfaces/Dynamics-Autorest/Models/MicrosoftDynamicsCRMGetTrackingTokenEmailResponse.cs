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
    /// GetTrackingTokenEmailResponse
    /// </summary>
    public partial class MicrosoftDynamicsCRMGetTrackingTokenEmailResponse
    {
        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMGetTrackingTokenEmailResponse class.
        /// </summary>
        public MicrosoftDynamicsCRMGetTrackingTokenEmailResponse()
        {
            CustomInit();
        }

        /// <summary>
        /// Initializes a new instance of the
        /// MicrosoftDynamicsCRMGetTrackingTokenEmailResponse class.
        /// </summary>
        public MicrosoftDynamicsCRMGetTrackingTokenEmailResponse(string trackingToken = default(string))
        {
            TrackingToken = trackingToken;
            CustomInit();
        }

        /// <summary>
        /// An initialization method that performs custom operations like setting defaults
        /// </summary>
        partial void CustomInit();

        /// <summary>
        /// </summary>
        [JsonProperty(PropertyName = "TrackingToken")]
        public string TrackingToken { get; set; }

    }
}