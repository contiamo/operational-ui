import Layout from "../../../components/Layout"
import { Sunburst } from "@operational/visualizations"
import Marathon from "../../../components/Marathon"
import { Card, CardHeader } from "@operational/components"

export const marathon = ({ test, afterAll, container }) => {
  const viz = new Sunburst(container)

  const data = {
    name: "All",
    value: "11040",
    color: "#aaa",
    children: [
      {
        name: "Additional Party Entities ABE",
        value: "35",
        children: [
          {
            name: "AdditionalPartyAttributes",
            value: "4"
          },
          {
            name: "PartyAccount",
            value: "7"
          },
          {
            name: "PartyAccountContact",
            value: "3"
          },
          {
            name: "PartyAccountCurrency",
            value: "3"
          },
          {
            name: "PartyAccountRelationship",
            value: "3"
          },
          {
            name: "PartyAccountTaxExemption",
            value: "4"
          },
          {
            name: "PartyCreditProfile",
            value: "6"
          },
          {
            name: "PartyCreditProfileReference",
            value: "4"
          },
          {
            name: "PartyDisputedAmount",
            value: "1"
          }
        ]
      },
      {
        name: "Agreement ABE",
        value: "39",
        children: [
          {
            name: "Agreement",
            value: "9"
          },
          {
            name: "AgreementApproval",
            value: "6"
          },
          {
            name: "AgreementAuthorization",
            value: "4"
          },
          {
            name: "AgreementItem",
            value: "3"
          },
          {
            name: "AgreementTermOrCondition",
            value: "4"
          },
          {
            name: "EventPayload",
            value: "1"
          },
          {
            name: "ServiceLevelAgreement",
            value: "9"
          },
          {
            name: "ServiceLevelAgreementItem",
            value: "3"
          }
        ]
      },
      {
        name: "Agreement ABE::Commitment ABE",
        value: "20",
        children: [
          {
            name: "Commitment",
            value: "9"
          },
          {
            name: "CommitmentApproverRole",
            value: "2"
          },
          {
            name: "CommitmentFulfilmentRole",
            value: "2"
          },
          {
            name: "CommitmentProcurementRole",
            value: "2"
          },
          {
            name: "CommitmentTermOrCondition",
            value: "4"
          },
          {
            name: "ServiceLevelAgreement",
            value: "1"
          }
        ]
      },
      {
        name: "Applied Customer Billing Rate ABE",
        value: "65",
        children: [
          {
            name: "AppliedCustomerBillingAllowance",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingCharge",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingCredit",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingDiscount",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingProductAlteration",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingProductCharge",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingProductUsageRate",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingRate",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingRebate",
            value: "4"
          },
          {
            name: "AppliedCustomerBillingTaxRate",
            value: "5"
          },
          {
            name: "AppliedCustomerPenaltyCharge",
            value: "4"
          },
          {
            name: "AtomicAppliedCustomerBillingRate",
            value: "4"
          },
          {
            name: "ChurnRetentionStatistic",
            value: "1"
          },
          {
            name: "CompositeAppliedCustomerBillingRate",
            value: "4"
          },
          {
            name: "FinancialCharge",
            value: "1"
          },
          {
            name: "FinancialChargeSpec",
            value: "6"
          },
          {
            name: "ProductFinancialAccountRelationship",
            value: "4"
          }
        ]
      },
      {
        name: "Applied Customer Billing Rate ABE::Applied Customer Billing Rate Spec ABE",
        value: "8",
        children: [
          {
            name: "AppliedCustomerBillingRateSpec",
            value: "7"
          },
          {
            name: "AppliedCustomerPenaltyCharge",
            value: "1"
          }
        ]
      },
      {
        name: "Approval Notice",
        value: "1",
        children: [
          {
            name: "EventPayload",
            value: "1"
          }
        ]
      },
      {
        name: "Base Types ABE",
        value: "39",
        children: [
          {
            name: "AssociationRole",
            value: "1"
          },
          {
            name: "CostRate",
            value: "3"
          },
          {
            name: "Duration",
            value: "3"
          },
          {
            name: "Money",
            value: "3"
          },
          {
            name: "Quantity",
            value: "3"
          },
          {
            name: "Range",
            value: "3"
          },
          {
            name: "Rate",
            value: "3"
          },
          {
            name: "TimePeriod",
            value: "3"
          },
          {
            name: "URI",
            value: "10"
          },
          {
            name: "URL",
            value: "7"
          }
        ]
      },
      {
        name: "Base Types ABE::Example1",
        value: "14",
        children: [
          {
            name: "Account",
            value: "6"
          },
          {
            name: "Bank",
            value: "1"
          },
          {
            name: "BankCustomer",
            value: "2"
          },
          {
            name: "Name",
            value: "4"
          },
          {
            name: "URL",
            value: "1"
          }
        ]
      },
      {
        name: "Business Interaction ABE",
        value: "78",
        children: [
          {
            name: "Attachment",
            value: "2"
          },
          {
            name: "BusinessInteraction",
            value: "6"
          },
          {
            name: "BusinessInteractionItem",
            value: "3"
          },
          {
            name: "BusinessInteractionItemPrice",
            value: "4"
          },
          {
            name: "BusinessInteractionItemRelationship",
            value: "2"
          },
          {
            name: "BusinessInteractionLocation",
            value: "2"
          },
          {
            name: "BusinessInteractionRelationship",
            value: "3"
          },
          {
            name: "BusinessInteractionRole",
            value: "2"
          },
          {
            name: "BusinessInteractionSpec",
            value: "1"
          },
          {
            name: "BusinessInteractionType",
            value: "3"
          },
          {
            name: "BusinessInteractionVersion",
            value: "5"
          },
          {
            name: "Command",
            value: "6"
          },
          {
            name: "CustomerAccountInteractionRole",
            value: "2"
          },
          {
            name: "CustomerBillingInquiry",
            value: "1"
          },
          {
            name: "InquiryRequest",
            value: "6"
          },
          {
            name: "InquiryResponse",
            value: "6"
          },
          {
            name: "Notification",
            value: "6"
          },
          {
            name: "PartyAccountInteractionRole",
            value: "2"
          },
          {
            name: "PartyInteractionRole",
            value: "2"
          },
          {
            name: "Request",
            value: "6"
          },
          {
            name: "ResourceInteractionRole",
            value: "2"
          },
          {
            name: "Response",
            value: "6"
          }
        ]
      },
      {
        name: "Business Interaction ABE::Disputed Amount ABE",
        value: "23",
        children: [
          {
            name: "BusinessInteractionLocation",
            value: "1"
          },
          {
            name: "DAAAccepted",
            value: "3"
          },
          {
            name: "DAACancelled",
            value: "2"
          },
          {
            name: "DAACompleted",
            value: "2"
          },
          {
            name: "DAACreated",
            value: "3"
          },
          {
            name: "DAARejected",
            value: "3"
          },
          {
            name: "DisputedAmount",
            value: "7"
          },
          {
            name: "DisputedAmountActivity",
            value: "2"
          }
        ]
      },
      {
        name: "Calendar ABE",
        value: "143",
        children: [
          {
            name: "AbsoluteCalendarAlarm",
            value: "5"
          },
          {
            name: "Appointment",
            value: "1"
          },
          {
            name: "AttendeeGroup",
            value: "1"
          },
          {
            name: "Calendar",
            value: "4"
          },
          {
            name: "CalendarActionEntry",
            value: "14"
          },
          {
            name: "CalendarAlarm",
            value: "4"
          },
          {
            name: "CalendarEntry",
            value: "11"
          },
          {
            name: "CalendarEntryAssociation",
            value: "2"
          },
          {
            name: "CalendarEntryAttachment",
            value: "1"
          },
          {
            name: "CalendarEntryAttendance",
            value: "6"
          },
          {
            name: "CalendarEntryAttendee",
            value: "1"
          },
          {
            name: "CalendarEntryCategory",
            value: "2"
          },
          {
            name: "CalendarEntryInlineAttachment",
            value: "2"
          },
          {
            name: "CalendarEntryOrganizer",
            value: "1"
          },
          {
            name: "CalendarEntryParticipation",
            value: "5"
          },
          {
            name: "CalendarEntryReferenceAttachment",
            value: "2"
          },
          {
            name: "CalendarEvent",
            value: "15"
          },
          {
            name: "CalendarJournalEntry",
            value: "12"
          },
          {
            name: "CalendarPartyRole",
            value: "1"
          },
          {
            name: "CalendarToDo",
            value: "18"
          },
          {
            name: "CompoundCalendar",
            value: "4"
          },
          {
            name: "EventType",
            value: "1"
          },
          {
            name: "RecurrenceTemporalExpression",
            value: "2"
          },
          {
            name: "RelativeCalendarAlarm",
            value: "6"
          },
          {
            name: "SimpleCalendar",
            value: "4"
          },
          {
            name: "SimpleTemporalExpression",
            value: "3"
          },
          {
            name: "SingleAttendee",
            value: "1"
          },
          {
            name: "TAMApplication",
            value: "1"
          },
          {
            name: "TemporalExpression",
            value: "2"
          },
          {
            name: "TimeZone",
            value: "5"
          },
          {
            name: "TimeZoneRule",
            value: "6"
          }
        ]
      },
      {
        name: "Calendar ABE::Schedule Definition ABE",
        value: "47",
        children: [
          {
            name: "CalendarEntryParticipation",
            value: "1"
          },
          {
            name: "DateScheduleDefinition",
            value: "7"
          },
          {
            name: "FixedScheduleDefinition",
            value: "1"
          },
          {
            name: "FixedScheduleItem",
            value: "2"
          },
          {
            name: "MonthlyScheduleDayofMonthDefinition",
            value: "7"
          },
          {
            name: "MonthlyScheduleDayofWeekDefinition",
            value: "8"
          },
          {
            name: "RecurringScheduleDefinition",
            value: "6"
          },
          {
            name: "ScheduleDefinition",
            value: "1"
          },
          {
            name: "ScheduleDefinitionExcludedDates",
            value: "2"
          },
          {
            name: "ScheduledDuration",
            value: "5"
          },
          {
            name: "WeeklyScheduleDefinition",
            value: "7"
          }
        ]
      },
      {
        name: "Capacity ABE",
        value: "55",
        children: [
          {
            name: "AdhocCollection",
            value: "1"
          },
          {
            name: "ApplicableTimePeriod",
            value: "5"
          },
          {
            name: "AppliedCapacityDemand",
            value: "2"
          },
          {
            name: "Capacity",
            value: "2"
          },
          {
            name: "CapacityAmount",
            value: "5"
          },
          {
            name: "CapacityDemand",
            value: "7"
          },
          {
            name: "CapacityDemandRelationship",
            value: "3"
          },
          {
            name: "CapacityRelationship",
            value: "3"
          },
          {
            name: "ProductCapacity",
            value: "2"
          },
          {
            name: "ProductCapacityDemand",
            value: "7"
          },
          {
            name: "ResourceCapacity",
            value: "2"
          },
          {
            name: "ResourceCapacityDemand",
            value: "7"
          },
          {
            name: "ServiceCapacity",
            value: "2"
          },
          {
            name: "ServiceCapacityDemand",
            value: "7"
          }
        ]
      },
      {
        name: "Catalog ABE",
        value: "18",
        children: [
          {
            name: "Catalog",
            value: "7"
          },
          {
            name: "CatalogSpecification",
            value: "7"
          },
          {
            name: "CatalogSpecificationRelationship",
            value: "3"
          },
          {
            name: "FileTransferData",
            value: "1"
          }
        ]
      },
      {
        name: "Catalog ABE::Entity Catalog ABE",
        value: "33",
        children: [
          {
            name: "CatalogRelationship",
            value: "3"
          },
          {
            name: "CatalogSpecificationRelationship",
            value: "1"
          },
          {
            name: "EntityCatalog",
            value: "7"
          },
          {
            name: "EntityCatalogItem",
            value: "1"
          },
          {
            name: "EntityCatalogSpecification",
            value: "7"
          },
          {
            name: "FederatedCatalog",
            value: "7"
          },
          {
            name: "FederatedCatalogSpecification",
            value: "7"
          }
        ]
      },
      {
        name: "Common Business Entities Domain",
        value: "1",
        children: [
          {
            name: "CustomerBillingInquiry",
            value: "1"
          }
        ]
      },
      {
        name: "Competitor ABE",
        value: "25",
        children: [
          {
            name: "CompetitiveTier",
            value: "4"
          },
          {
            name: "Competitor",
            value: "8"
          },
          {
            name: "CompetitorMarketSegment",
            value: "4"
          },
          {
            name: "CompetitorMarketSegmentSWOT",
            value: "2"
          },
          {
            name: "CompetitorSWOT",
            value: "2"
          },
          {
            name: "CompetitorTier",
            value: "2"
          },
          {
            name: "SWOT",
            value: "2"
          },
          {
            name: "SalesChannel",
            value: "1"
          }
        ]
      },
      {
        name: "Competitor ABE::Competitor Intelligence ABE",
        value: "56",
        children: [
          {
            name: "AtomicCompIntelCharacteristic",
            value: "11"
          },
          {
            name: "CompetitorIntelCharacteristic",
            value: "11"
          },
          {
            name: "CompetitorIntelCharacteristicValue",
            value: "9"
          },
          {
            name: "CompetitorIntelligence",
            value: "4"
          },
          {
            name: "CompetitorIntelligenceMarketSegment",
            value: "5"
          },
          {
            name: "CompetitorIntelligencePartyRole",
            value: "4"
          },
          {
            name: "CompetitorMarketSegmentSWOT",
            value: "1"
          },
          {
            name: "CompositeCompIntelCharacteristic",
            value: "11"
          }
        ]
      },
      {
        name: "Competitor ABE::Competitor Product Correlation ABE",
        value: "48",
        children: [
          {
            name: "AtomicCompIntelCharacteristic",
            value: "1"
          },
          {
            name: "AtomicCompProdCorrelationCharacteristic",
            value: "11"
          },
          {
            name: "CompProdCorCharacteristicValue",
            value: "9"
          },
          {
            name: "CompProdCorrelationCharacteristic",
            value: "11"
          },
          {
            name: "CompetitorProductCorrelation",
            value: "5"
          },
          {
            name: "CompositeCompProdCorrelationCharacteristic",
            value: "11"
          }
        ]
      },
      {
        name: "Configuration and Profiling ABE",
        value: "42",
        children: [
          {
            name: "CompAtomicConfigSpecRel",
            value: "6"
          },
          {
            name: "ConfigRelationship",
            value: "3"
          },
          {
            name: "ConfigSpecCharUse",
            value: "11"
          },
          {
            name: "ConfigSpecConstraintMember",
            value: "4"
          },
          {
            name: "ConfigSpecRelationship",
            value: "3"
          },
          {
            name: "Configuration",
            value: "5"
          },
          {
            name: "ConfigurationSpecConstraint",
            value: "3"
          },
          {
            name: "ConfigurationSpecification",
            value: "6"
          },
          {
            name: "DAACompleted",
            value: "1"
          }
        ]
      },
      {
        name: "Configuration and Profiling ABE::Configuration Instance Diagrams and Instances",
        value: "7",
        children: [
          {
            name: "ConfigSpecCharUse",
            value: "1"
          },
          {
            name: "Resource1",
            value: "6"
          }
        ]
      },
      {
        name:
          "Configuration and Profiling ABE::Configuration Instance Diagrams and Instances::Configuration Instance Diagrams ",
        value: "1",
        children: [
          {
            name: "Resource1",
            value: "1"
          }
        ]
      },
      {
        name: "Contact Lead Prospect ABE",
        value: "1",
        children: [
          {
            name: "CompetitorProductCorrelation",
            value: "1"
          }
        ]
      },
      {
        name: "Customer ABE",
        value: "10",
        children: [
          {
            name: "Customer",
            value: "8"
          },
          {
            name: "CustomerAccount",
            value: "1"
          },
          {
            name: "CustomerDisputedAmount",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Bill ABE",
        value: "2",
        children: [
          {
            name: "AppliedCustomerBillingRateSpec",
            value: "1"
          },
          {
            name: "CustomerBill",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Bill ABE::Customer Account Balance ABE",
        value: "12",
        children: [
          {
            name: "BalanceUsageRule",
            value: "4"
          },
          {
            name: "ChargeAmountThreshold",
            value: "2"
          },
          {
            name: "ChargeSplittingRule",
            value: "1"
          },
          {
            name: "CustomerAccountBalance",
            value: "4"
          },
          {
            name: "UsageCharacteristicSumSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Bill ABE::Customer Account Balance ABE::Customer Account Balance Type ABE",
        value: "7",
        children: [
          {
            name: "CustomerAccountBalanceType",
            value: "6"
          },
          {
            name: "CustomerDiscount",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Bill ABE::Customer Account Balance ABE::Customer Billing Credit ABE",
        value: "19",
        children: [
          {
            name: "ChargeSplittingRule",
            value: "1"
          },
          {
            name: "CustomerAllowance",
            value: "2"
          },
          {
            name: "CustomerAllowanceBalance",
            value: "4"
          },
          {
            name: "CustomerBillingCredit",
            value: "2"
          },
          {
            name: "CustomerBillingCreditBalance",
            value: "4"
          },
          {
            name: "CustomerDiscount",
            value: "2"
          },
          {
            name: "CustomerDiscountBalance",
            value: "4"
          }
        ]
      },
      {
        name: "Customer Bill ABE::Customer Billing Statistic ABE",
        value: "40",
        children: [
          {
            name: "CustomerAccountChargeSum",
            value: "2"
          },
          {
            name: "CustomerAccountChargeSumBalance",
            value: "3"
          },
          {
            name: "CustomerAccountChargeSumSpec",
            value: "5"
          },
          {
            name: "CustomerBill",
            value: "1"
          },
          {
            name: "CustomerBillingProductChargeSum",
            value: "2"
          },
          {
            name: "CustomerBillingProductChargeSumBalance",
            value: "3"
          },
          {
            name: "CustomerBillingProductChargeSumSpec",
            value: "5"
          },
          {
            name: "CustomerBillingStatistic",
            value: "2"
          },
          {
            name: "CustomerBillingStatisticBalance",
            value: "2"
          },
          {
            name: "CustomerBillingStatisticSpec",
            value: "5"
          },
          {
            name: "UsageCharacteristicSum",
            value: "2"
          },
          {
            name: "UsageCharacteristicSumBalance",
            value: "3"
          },
          {
            name: "UsageCharacteristicSumSpec",
            value: "5"
          }
        ]
      },
      {
        name: "Customer Bill Collection ABE",
        value: "1",
        children: [
          {
            name: "CustomerAccountBalanceType",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Bill Collection ABE::Customer Payment ABE",
        value: "3",
        children: [
          {
            name: "CustomerAccountBalanceType",
            value: "1"
          },
          {
            name: "CustomerPayment",
            value: "1"
          },
          {
            name: "CustomerPaymentItem",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Bill Collection ABE::Dunning ABE",
        value: "36",
        children: [
          {
            name: "CustomerPaymentItem",
            value: "1"
          },
          {
            name: "DunningCase",
            value: "3"
          },
          {
            name: "DunningCaseRule",
            value: "3"
          },
          {
            name: "DunningNotification",
            value: "7"
          },
          {
            name: "DunningRule",
            value: "10"
          },
          {
            name: "DunningScenario",
            value: "4"
          },
          {
            name: "DunningWriteOff",
            value: "2"
          },
          {
            name: "HardDunning",
            value: "3"
          },
          {
            name: "SoftDunning",
            value: "3"
          }
        ]
      },
      {
        name: "Customer Bill Inquiry ABE",
        value: "7",
        children: [
          {
            name: "CustomerBillingInquiry",
            value: "6"
          },
          {
            name: "CustomerProblemTask",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Domain",
        value: "1",
        children: [
          {
            name: "WorkSpecRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Interaction ABE",
        value: "26",
        children: [
          {
            name: "CustomerDisputedAmount",
            value: "7"
          },
          {
            name: "CustomerInquiry",
            value: "6"
          },
          {
            name: "CustomerInvoiceInquiry",
            value: "6"
          },
          {
            name: "CustomerOrderItem",
            value: "1"
          },
          {
            name: "CustomerQuote",
            value: "6"
          }
        ]
      },
      {
        name: "Customer Order ABE",
        value: "3",
        children: [
          {
            name: "CustomerOrder",
            value: "1"
          },
          {
            name: "CustomerOrderItem",
            value: "1"
          },
          {
            name: "WorkSpecRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Customer Problem ABE",
        value: "23",
        children: [
          {
            name: "CloseCustomerProblemSummary",
            value: "4"
          },
          {
            name: "CustomerProblem",
            value: "7"
          },
          {
            name: "CustomerProblemTask",
            value: "5"
          },
          {
            name: "CustomerProblemWorkaround",
            value: "3"
          },
          {
            name: "HardDunning",
            value: "1"
          },
          {
            name: "KnownProblemDescription",
            value: "3"
          }
        ]
      },
      {
        name: "Customer Service Level Agreement ABE",
        value: "10",
        children: [
          {
            name: "CustomerAccount",
            value: "1"
          },
          {
            name: "CustomerServiceLevelAgreement",
            value: "9"
          }
        ]
      },
      {
        name: "Customer Statistic ABE",
        value: "2",
        children: [
          {
            name: "ChurnRetentionStatistic",
            value: "1"
          },
          {
            name: "CustomerServiceLevelAgreement",
            value: "1"
          }
        ]
      },
      {
        name: "Engaged Party Domain",
        value: "1",
        children: [
          {
            name: "EventPayload",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Domain",
        value: "1",
        children: [
          {
            name: "Media",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Effectiveness ABE",
        value: "1",
        children: [
          {
            name: "RevenueAssuranceAssessmentItem",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Effectiveness ABE::Business Objective ABE",
        value: "9",
        children: [
          {
            name: "AtomicBusinessObjective",
            value: "2"
          },
          {
            name: "BusinessObjective",
            value: "2"
          },
          {
            name: "BusinessObjectiveSpecification",
            value: "2"
          },
          {
            name: "CompositeBusinessObjective",
            value: "2"
          },
          {
            name: "ProcessDefintion",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Effectiveness ABE::Process ABE",
        value: "2",
        children: [
          {
            name: "Process",
            value: "1"
          },
          {
            name: "RevenueAssuranceAssessmentItem",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Effectiveness ABE::Process Definition ABE",
        value: "2",
        children: [
          {
            name: "Process",
            value: "1"
          },
          {
            name: "ProcessDefintion",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE",
        value: "1",
        children: [
          {
            name: "Media",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE",
        value: "1",
        children: [
          {
            name: "Media",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE::Security Entity ABE",
        value: "7",
        children: [
          {
            name: "CommonPlatformEnumeration",
            value: "2"
          },
          {
            name: "PartyRoleSecurityEntity",
            value: "1"
          },
          {
            name: "PartySecurityEntity",
            value: "1"
          },
          {
            name: "ResourceSecurityEntity",
            value: "1"
          },
          {
            name: "SecurityEntity",
            value: "1"
          },
          {
            name: "SecurityIncidentAssessment",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE::Security Event ABE",
        value: "95",
        children: [
          {
            name: "AnomolySecurityEvent",
            value: "10"
          },
          {
            name: "AuditRecordSecurityEvent",
            value: "9"
          },
          {
            name: "DHCPSecurityEvent",
            value: "10"
          },
          {
            name: "NACSecurityEvent",
            value: "10"
          },
          {
            name: "NACSecurityEventSubject",
            value: "2"
          },
          {
            name: "NATSecurityEvent",
            value: "8"
          },
          {
            name: "NetFlowSecurityEvent",
            value: "12"
          },
          {
            name: "SecurityEvent",
            value: "8"
          },
          {
            name: "SecurityEventCollectionMethod",
            value: "2"
          },
          {
            name: "SecurityEventEndpoint",
            value: "3"
          },
          {
            name: "SecurityEventSpecification",
            value: "6"
          },
          {
            name: "SecurityEventSpecificationType",
            value: "1"
          },
          {
            name: "SecuritySignature",
            value: "1"
          },
          {
            name: "SecurityVulnerabilityMetric",
            value: "1"
          },
          {
            name: "SignatureSecurityEvent",
            value: "12"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE::Security Incident ABE",
        value: "49",
        children: [
          {
            name: "AuditRecordSecurityEvent",
            value: "1"
          },
          {
            name: "SecurityIncident",
            value: "12"
          },
          {
            name: "SecurityIncidentAssessment",
            value: "3"
          },
          {
            name: "SecurityIncidentAttachment",
            value: "4"
          },
          {
            name: "SecurityIncidentAttackMethod",
            value: "4"
          },
          {
            name: "SecurityIncidentHistory",
            value: "3"
          },
          {
            name: "SecurityIncidentImpact",
            value: "5"
          },
          {
            name: "SecurityIncidentImpactLevel",
            value: "5"
          },
          {
            name: "SecurityIncidentOperationalImpactLevel",
            value: "5"
          },
          {
            name: "SecurityIncidentRelatedParty",
            value: "2"
          },
          {
            name: "SecurityIncidentTechnicalImpactLevel",
            value: "5"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE::Security Threat ABE",
        value: "32",
        children: [
          {
            name: "Media",
            value: "1"
          },
          {
            name: "PartyRoleSecurityThreatActor",
            value: "3"
          },
          {
            name: "PartySecurityThreatActor",
            value: "3"
          },
          {
            name: "SecurityThreat",
            value: "5"
          },
          {
            name: "SecurityThreatActor",
            value: "3"
          },
          {
            name: "SecurityThreatExploit",
            value: "5"
          },
          {
            name: "SecurityThreatIndicator",
            value: "6"
          },
          {
            name: "SecurityThreatIndicatorSpecification",
            value: "6"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE::Security Threat ABE::Security Threat Technique ABE",
        value: "47",
        children: [
          {
            name: "Email",
            value: "1"
          },
          {
            name: "EmailAttachment",
            value: "1"
          },
          {
            name: "EmailSecurityThreatTechnique",
            value: "9"
          },
          {
            name: "PKISecurityThreatTechnique",
            value: "9"
          },
          {
            name: "PublicKeyInfrastructureCertificate",
            value: "1"
          },
          {
            name: "SQL",
            value: "1"
          },
          {
            name: "SQLSecurityThreatTechnique",
            value: "9"
          },
          {
            name: "SecurityThreatIndicatorSpecification",
            value: "1"
          },
          {
            name: "SecurityThreatTechnique",
            value: "9"
          },
          {
            name: "SecurityThreatTechniqueSpecification",
            value: "6"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE::Security Threat ABE::Security Threat Tool ABE",
        value: "35",
        children: [
          {
            name: "Botnet",
            value: "1"
          },
          {
            name: "BotnetSecurityThreatTool",
            value: "6"
          },
          {
            name: "P2PFile",
            value: "1"
          },
          {
            name: "P2PFileSharing",
            value: "1"
          },
          {
            name: "P2PFileSharingSecurityThreatTool",
            value: "6"
          },
          {
            name: "SecurityThreatTechniqueSpecification",
            value: "1"
          },
          {
            name: "SecurityThreatTool",
            value: "6"
          },
          {
            name: "SecurityThreatToolSpecification",
            value: "6"
          },
          {
            name: "Tor",
            value: "1"
          },
          {
            name: "TorSecurityThreatTool",
            value: "6"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Enterprise Security ABE::Security Vulnerability ABE",
        value: "67",
        children: [
          {
            name: "CommonWeaknessEnumeration",
            value: "2"
          },
          {
            name: "Patch",
            value: "1"
          },
          {
            name: "SecurityThreatToolSpecification",
            value: "1"
          },
          {
            name: "SecurityVulnerability",
            value: "11"
          },
          {
            name: "SecurityVulnerabilityCategoryAssignment",
            value: "2"
          },
          {
            name: "SecurityVulnerabilityCategoryType",
            value: "3"
          },
          {
            name: "SecurityVulnerabilityFixAction",
            value: "6"
          },
          {
            name: "SecurityVulnerabilitySoftware",
            value: "20"
          },
          {
            name: "SecurityVulnerabilityTool",
            value: "21"
          }
        ]
      },
      {
        name:
          "Enterprise Risk ABE::Enterprise Security ABE::Security Vulnerability ABE::Security Vulnerability Score ABE",
        value: "14",
        children: [
          {
            name: "AtomicSecurityVulnerabilityMetric",
            value: "2"
          },
          {
            name: "CompositeSecurityVulnerabilityMetric",
            value: "2"
          },
          {
            name: "SecVulnerabilityScoreAlgorithm",
            value: "1"
          },
          {
            name: "SecurityVulnerabilityMetric",
            value: "2"
          },
          {
            name: "SecurityVulnerabilityMetricValue",
            value: "2"
          },
          {
            name: "SecurityVulnerabilityScore",
            value: "5"
          }
        ]
      },
      {
        name:
          "Enterprise Risk ABE::Enterprise Security ABE::Security Vulnerability ABE::Security Vulnerability Scoring Definition ABE",
        value: "31",
        children: [
          {
            name: "AtomicSecVulScoringMetricDefn",
            value: "6"
          },
          {
            name: "CompositeSecVulScoringMetricDefn",
            value: "6"
          },
          {
            name: "SecVulnerabilityMetricValueDefn",
            value: "5"
          },
          {
            name: "SecVulnerabilityScoringMetricDefn",
            value: "6"
          },
          {
            name: "SecVulnerabilityScoringMetricDefnAssignment",
            value: "2"
          },
          {
            name: "SecVulnerabilityScoringSystem",
            value: "5"
          },
          {
            name: "SecurityVulnerabilityCategoryType",
            value: "1"
          }
        ]
      },
      {
        name:
          "Enterprise Risk ABE::Enterprise Security ABE::Security Vulnerability ABE::Security Vulnerability Scoring Definition ABE::Security Vulnerability Scoring Algorithm ABE",
        value: "34",
        children: [
          {
            name: "AtomicSecVulScoringMetricDefn",
            value: "1"
          },
          {
            name: "SecVulnerabilityGeneralMbr",
            value: "9"
          },
          {
            name: "SecVulnerabilityMetricDefnMbr",
            value: "6"
          },
          {
            name: "SecVulnerabilityMetricValueDefnMbr",
            value: "6"
          },
          {
            name: "SecVulnerabilityScoreAlgorithm",
            value: "6"
          },
          {
            name: "SecVulnerabilityScoreAlgorithmMember",
            value: "6"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Revenue Assurance ABE",
        value: "1",
        children: [
          {
            name: "CommonPlatformEnumeration",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Revenue Assurance ABE::RA Action_Response ABE",
        value: "33",
        children: [
          {
            name: "RevenueAssuranceAction",
            value: "16"
          },
          {
            name: "RevenueAssuranceActionSpec",
            value: "9"
          },
          {
            name: "RevenueAssuranceResponse",
            value: "6"
          },
          {
            name: "RevenueAssuranceResponseSpec",
            value: "1"
          },
          {
            name: "RevenueAssuranceTroubleTicket",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Revenue Assurance ABE::RA Assessment ABE",
        value: "21",
        children: [
          {
            name: "RevenueAssuranceAssessment",
            value: "7"
          },
          {
            name: "RevenueAssuranceAssessmentItem",
            value: "4"
          },
          {
            name: "RevenueAssuranceAssessmentResult",
            value: "3"
          },
          {
            name: "RevenueAssuranceKPIConsequence",
            value: "1"
          },
          {
            name: "RevenueAssuranceRecommendation",
            value: "3"
          },
          {
            name: "RevenueAssuranceTrend",
            value: "3"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Revenue Assurance ABE::RA Control ABE",
        value: "49",
        children: [
          {
            name: "RevenueAssuranceApplicability",
            value: "7"
          },
          {
            name: "RevenueAssuranceConsequence",
            value: "5"
          },
          {
            name: "RevenueAssuranceControl",
            value: "8"
          },
          {
            name: "RevenueAssuranceControlConsequence",
            value: "5"
          },
          {
            name: "RevenueAssuranceObjective",
            value: "11"
          },
          {
            name: "RevenueAssuranceParameter",
            value: "8"
          },
          {
            name: "RevenueAssuranceParmValue",
            value: "4"
          },
          {
            name: "RevenueAssuranceResponseSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Revenue Assurance ABE::RA Key Performance Indicator ABE",
        value: "14",
        children: [
          {
            name: "RevenueAssuranceKPI",
            value: "8"
          },
          {
            name: "RevenueAssuranceKPIConsequence",
            value: "5"
          },
          {
            name: "RevenueAssuranceViolation",
            value: "1"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Revenue Assurance ABE::RA Trouble Ticket ABE",
        value: "15",
        children: [
          {
            name: "CommonPlatformEnumeration",
            value: "1"
          },
          {
            name: "RevenueAssuranceTroubleTicket",
            value: "10"
          },
          {
            name: "RevenueAssuranceTroubleTicketSpec",
            value: "4"
          }
        ]
      },
      {
        name: "Enterprise Risk ABE::Revenue Assurance ABE::RA Violation ABE",
        value: "11",
        children: [
          {
            name: "RevenueAssuranceApplicability",
            value: "1"
          },
          {
            name: "RevenueAssuranceViolation",
            value: "6"
          },
          {
            name: "RevenueAssuranceViolationSpec",
            value: "4"
          }
        ]
      },
      {
        name: "Event ABE",
        value: "14",
        children: [
          {
            name: "EventOccurence",
            value: "1"
          },
          {
            name: "EventPayload",
            value: "3"
          },
          {
            name: "EventRecord",
            value: "3"
          },
          {
            name: "EventRecordAtomic",
            value: "3"
          },
          {
            name: "EventRecordComposite",
            value: "3"
          },
          {
            name: "Vertex",
            value: "1"
          }
        ]
      },
      {
        name: "Location ABE",
        value: "10",
        children: [
          {
            name: "AddressContactMediumRole",
            value: "2"
          },
          {
            name: "Name",
            value: "1"
          },
          {
            name: "Place",
            value: "3"
          },
          {
            name: "PlacePhysicalResourceAssoc",
            value: "4"
          }
        ]
      },
      {
        name: "Location ABE::Geographic Place ABE",
        value: "130",
        children: [
          {
            name: "AdministrativeArea",
            value: "6"
          },
          {
            name: "Country",
            value: "9"
          },
          {
            name: "ExchangeLocation",
            value: "11"
          },
          {
            name: "ExchangeServiceArea",
            value: "7"
          },
          {
            name: "GeographicArea",
            value: "8"
          },
          {
            name: "GeographicLocation",
            value: "5"
          },
          {
            name: "GeographicLocationName",
            value: "4"
          },
          {
            name: "GeographicLocationRelationship",
            value: "4"
          },
          {
            name: "GeographicLocationType",
            value: "3"
          },
          {
            name: "GeographicPlace",
            value: "3"
          },
          {
            name: "GeographicPostcode",
            value: "6"
          },
          {
            name: "GeographicSite",
            value: "6"
          },
          {
            name: "GeographicSiteRole",
            value: "7"
          },
          {
            name: "GeographicState",
            value: "8"
          },
          {
            name: "Jurisdiction",
            value: "1"
          },
          {
            name: "LandUseType",
            value: "1"
          },
          {
            name: "LocalContinuativeCoordSystem",
            value: "1"
          },
          {
            name: "NetworkRoute",
            value: "4"
          },
          {
            name: "NetworkRouteSection",
            value: "6"
          },
          {
            name: "Property",
            value: "10"
          },
          {
            name: "SimpleGeographicLocation",
            value: "5"
          },
          {
            name: "Street",
            value: "3"
          },
          {
            name: "StreetName",
            value: "4"
          },
          {
            name: "StreetSegment",
            value: "6"
          },
          {
            name: "StreetSegmentGeoAddressRelationship",
            value: "2"
          }
        ]
      },
      {
        name: "Location ABE::Geographic Place ABE::Geographic Address ABE",
        value: "98",
        children: [
          {
            name: "AbstractGeographicAddress",
            value: "3"
          },
          {
            name: "AmericanPropertyAddress",
            value: "18"
          },
          {
            name: "AustralianPropertyAddress",
            value: "14"
          },
          {
            name: "AustralianRuralAddress",
            value: "5"
          },
          {
            name: "GeographicAddress",
            value: "5"
          },
          {
            name: "GeographicSubAddress",
            value: "3"
          },
          {
            name: "JapanesePropertyAddress",
            value: "14"
          },
          {
            name: "LogicalAddress",
            value: "1"
          },
          {
            name: "PoBoxAddress",
            value: "3"
          },
          {
            name: "PostalDeliveryAddress",
            value: "1"
          },
          {
            name: "PropertyAddressAssociation",
            value: "4"
          },
          {
            name: "PropertySubAddress",
            value: "3"
          },
          {
            name: "Symbology",
            value: "1"
          },
          {
            name: "UrbanPropertyAddress",
            value: "14"
          },
          {
            name: "UrbanPropertySubAddress",
            value: "9"
          }
        ]
      },
      {
        name: "Location ABE::Geographic Place ABE::Symbology ABE",
        value: "18",
        children: [
          {
            name: "Jurisdiction",
            value: "1"
          },
          {
            name: "LineSymbology",
            value: "4"
          },
          {
            name: "PointSymbology",
            value: "5"
          },
          {
            name: "SurfaceSymbology",
            value: "6"
          },
          {
            name: "Symbology",
            value: "2"
          }
        ]
      },
      {
        name: "Location ABE::Local Place ABE",
        value: "96",
        children: [
          {
            name: "AbsoluteLocalLocation",
            value: "7"
          },
          {
            name: "AbsoluteLocalOrientation",
            value: "4"
          },
          {
            name: "BTInternalAddress",
            value: "6"
          },
          {
            name: "BoundingVolumeRepresentation",
            value: "1"
          },
          {
            name: "CompoundInternalLocation",
            value: "1"
          },
          {
            name: "CompoundLocalAddress",
            value: "6"
          },
          {
            name: "GridLocalLocation",
            value: "7"
          },
          {
            name: "LinearReferenceSystem",
            value: "1"
          },
          {
            name: "LocalAddress",
            value: "6"
          },
          {
            name: "LocalContinuativeCoordSystem",
            value: "5"
          },
          {
            name: "LocalContinuativeLocation",
            value: "4"
          },
          {
            name: "LocalCoordinateSystem",
            value: "5"
          },
          {
            name: "LocalGeometry",
            value: "1"
          },
          {
            name: "LocalGridCoordinateSystem",
            value: "5"
          },
          {
            name: "LocalLineString",
            value: "1"
          },
          {
            name: "LocalLocation",
            value: "4"
          },
          {
            name: "LocalLocationRelationship",
            value: "4"
          },
          {
            name: "LocalPlace",
            value: "3"
          },
          {
            name: "LocalPoint",
            value: "1"
          },
          {
            name: "LocalPolygon",
            value: "1"
          },
          {
            name: "PlacePhysicalResourceAssoc",
            value: "1"
          },
          {
            name: "RelativeLocalLocation",
            value: "7"
          },
          {
            name: "Representation",
            value: "1"
          },
          {
            name: "SimpleLocalAddress",
            value: "6"
          },
          {
            name: "SolidRepresentation",
            value: "1"
          },
          {
            name: "TelstraInternalAddress",
            value: "6"
          },
          {
            name: "WireFrameRepresentation",
            value: "1"
          }
        ]
      },
      {
        name: "Location ABE::OpenGisSFS ABE",
        value: "16",
        children: [
          {
            name: "AbstractGeographicAddress",
            value: "1"
          },
          {
            name: "Curve",
            value: "1"
          },
          {
            name: "Geometry",
            value: "1"
          },
          {
            name: "GeometryCollection",
            value: "1"
          },
          {
            name: "Line",
            value: "1"
          },
          {
            name: "LineString",
            value: "1"
          },
          {
            name: "LinearRing",
            value: "1"
          },
          {
            name: "MultiCurve",
            value: "1"
          },
          {
            name: "MultiLineString",
            value: "1"
          },
          {
            name: "MultiPoint",
            value: "1"
          },
          {
            name: "MultiPolygon",
            value: "1"
          },
          {
            name: "MultiSurface",
            value: "1"
          },
          {
            name: "Point",
            value: "1"
          },
          {
            name: "Polygon",
            value: "1"
          },
          {
            name: "SpatialReferenceSystem",
            value: "1"
          },
          {
            name: "Surface",
            value: "1"
          }
        ]
      },
      {
        name: "Loyalty ABE",
        value: "1",
        children: [
          {
            name: "AtomicProductUsageSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Loyalty ABE::Loyalty Program ABE",
        value: "24",
        children: [
          {
            name: "LoyaltyAccount",
            value: "1"
          },
          {
            name: "LoyaltyBalance",
            value: "3"
          },
          {
            name: "LoyaltyBurn",
            value: "2"
          },
          {
            name: "LoyaltyEarn",
            value: "2"
          },
          {
            name: "LoyaltyEvent",
            value: "1"
          },
          {
            name: "LoyaltyExecutionPoint",
            value: "4"
          },
          {
            name: "LoyaltyProgramMember",
            value: "5"
          },
          {
            name: "LoyaltyProgramProduct",
            value: "6"
          }
        ]
      },
      {
        name: "Loyalty ABE::Loyalty Program Specification ABE",
        value: "22",
        children: [
          {
            name: "AtomicProductUsageSpec",
            value: "1"
          },
          {
            name: "LoyaltyAction",
            value: "1"
          },
          {
            name: "LoyaltyCondition",
            value: "1"
          },
          {
            name: "LoyaltyEvent",
            value: "1"
          },
          {
            name: "LoyaltyProgramProdSpec",
            value: "8"
          },
          {
            name: "LoyaltyRule",
            value: "10"
          }
        ]
      },
      {
        name: "Market Segment ABE",
        value: "64",
        children: [
          {
            name: "AtomicMarketSegment",
            value: "7"
          },
          {
            name: "AtomicMarketSegmentCharacteristic",
            value: "11"
          },
          {
            name: "CompositeMarketSegment",
            value: "7"
          },
          {
            name: "CompositeMarketSegmentCharacteristic",
            value: "11"
          },
          {
            name: "MarketSegment",
            value: "7"
          },
          {
            name: "MarketSegmentCharacteristic",
            value: "11"
          },
          {
            name: "MarketSegmentCharacteristicValue",
            value: "9"
          },
          {
            name: "ProductTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Market Segment ABE::Market Statistic ABE",
        value: "28",
        children: [
          {
            name: "AtomicMarketSegmentCharacteristic",
            value: "1"
          },
          {
            name: "AtomicMarketStatistic",
            value: "9"
          },
          {
            name: "CompositeMarketStatistic",
            value: "9"
          },
          {
            name: "MarketStatistic",
            value: "9"
          }
        ]
      },
      {
        name: "Market Strategy Plan ABE",
        value: "2",
        children: [
          {
            name: "CompositeMarketStatistic",
            value: "1"
          },
          {
            name: "MarketStrategy",
            value: "1"
          }
        ]
      },
      {
        name: "Market_Sales Domain",
        value: "1",
        children: [
          {
            name: "ProductTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Marketing Campaign ABE",
        value: "49",
        children: [
          {
            name: "AtomicMarketingCampaignCharacteristic",
            value: "11"
          },
          {
            name: "CompetitorProductCorrelation",
            value: "1"
          },
          {
            name: "CompositeMarketingCampaignCharacteristic",
            value: "11"
          },
          {
            name: "MarketingCampaign",
            value: "6"
          },
          {
            name: "MarketingCampaignCharacteristic",
            value: "11"
          },
          {
            name: "MarketingCampaignCharacteristicValue",
            value: "9"
          }
        ]
      },
      {
        name: "Marketing Campaign ABE::Media ABE",
        value: "6",
        children: [
          {
            name: "AtomicMarketingCampaignCharacteristic",
            value: "1"
          },
          {
            name: "Media",
            value: "5"
          }
        ]
      },
      {
        name: "Metric ABE",
        value: "1",
        children: [
          {
            name: "InvolvementIdentification",
            value: "1"
          }
        ]
      },
      {
        name: "Metric ABE::Example Metric Entities",
        value: "27",
        children: [
          {
            name: "CustomerMetric",
            value: "2"
          },
          {
            name: "MetricDimensionValue",
            value: "1"
          },
          {
            name: "PerformanceMetricDefinition",
            value: "11"
          },
          {
            name: "ProductMetric",
            value: "2"
          },
          {
            name: "ProductMetricDefinition",
            value: "11"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Definition ABE",
        value: "32",
        children: [
          {
            name: "MetDefBusinessValue",
            value: "4"
          },
          {
            name: "MetDefDescExtension",
            value: "3"
          },
          {
            name: "MetricDefinition",
            value: "11"
          },
          {
            name: "MetricDefinitionCategory",
            value: "4"
          },
          {
            name: "MetricDefinitionHierarchy",
            value: "2"
          },
          {
            name: "MetricDefinitionHierarchyMember",
            value: "1"
          },
          {
            name: "MetricDefinitionInvolvement",
            value: "3"
          },
          {
            name: "MetricDefinitionRelationship",
            value: "3"
          },
          {
            name: "MetricMeasureGroup",
            value: "1"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Definition ABE::Metric Definition Dimension ABE",
        value: "13",
        children: [
          {
            name: "MetricDefDimValueUse",
            value: "2"
          },
          {
            name: "MetricDefinitionDimensionUse",
            value: "3"
          },
          {
            name: "MetricDefinitionRelationship",
            value: "1"
          },
          {
            name: "MetricDimension",
            value: "4"
          },
          {
            name: "MetricDimensionValue",
            value: "3"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Definition Measure ABE",
        value: "46",
        children: [
          {
            name: "ConsequenceMetricNotificationSpec",
            value: "1"
          },
          {
            name: "InvolvementIdentification",
            value: "1"
          },
          {
            name: "MetricDefMeasure",
            value: "8"
          },
          {
            name: "MetricDefMeasureApplicability",
            value: "8"
          },
          {
            name: "MetricDefMeasureConsequence",
            value: "7"
          },
          {
            name: "MetricDefMeasureExpression",
            value: "5"
          },
          {
            name: "MetricDefMeasureGroup",
            value: "2"
          },
          {
            name: "MetricDefinitionDeterminationMethod",
            value: "8"
          },
          {
            name: "MetricDefinitionMethodArgument",
            value: "6"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Definition Measure ABE::Metric Definition Measure Threshold ABE",
        value: "33",
        children: [
          {
            name: "MetricDefMeasureExpression",
            value: "1"
          },
          {
            name: "MetricDefMeasureThreshConsDependency",
            value: "2"
          },
          {
            name: "MetricDefMeasureThresholdConsequence",
            value: "2"
          },
          {
            name: "MetricDefMeasureThresholdRelationship",
            value: "2"
          },
          {
            name: "MetricDefMeasureThresholdRule",
            value: "4"
          },
          {
            name: "MetricDefMeasureThresholdSet",
            value: "5"
          },
          {
            name: "MetricThresholdRuleDefinition",
            value: "10"
          },
          {
            name: "PreDefinedMetricThresholdRule",
            value: "5"
          },
          {
            name: "PreDefinedMetricThresholdRuleParam",
            value: "2"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Measure ABE",
        value: "14",
        children: [
          {
            name: "ConsequenceMetricNotification",
            value: "6"
          },
          {
            name: "MetricDefMeasureThresholdRelationship",
            value: "1"
          },
          {
            name: "MetricMeasure",
            value: "2"
          },
          {
            name: "MetricMeasureConsequence",
            value: "1"
          },
          {
            name: "MetricMeasureGroup",
            value: "3"
          },
          {
            name: "MetricMeasureThresholdRule",
            value: "1"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Monitoring ABE",
        value: "7",
        children: [
          {
            name: "MetricMeasurementObservation",
            value: "2"
          },
          {
            name: "MonitoredMetricClassCriterion",
            value: "2"
          },
          {
            name: "MonitoredMetricInstanceCriterion",
            value: "1"
          },
          {
            name: "MonitoredMetricObjectCriterion",
            value: "1"
          },
          {
            name: "PerformanceMetricDefinition",
            value: "1"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Monitoring ABE::Metric Collection ABE",
        value: "23",
        children: [
          {
            name: "AdhocMetricCollection",
            value: "11"
          },
          {
            name: "MetricMeasurementCollectionJob",
            value: "11"
          },
          {
            name: "MetricMeasurementObservation",
            value: "1"
          }
        ]
      },
      {
        name: "Metric ABE::Metric Monitoring ABE::Metric Job ABE",
        value: "28",
        children: [
          {
            name: "AdhocMetricCollection",
            value: "1"
          },
          {
            name: "MetricMeasurementJob",
            value: "9"
          },
          {
            name: "MetricMeasurementProductionJob",
            value: "9"
          },
          {
            name: "MetricMeasurementThresholdJob",
            value: "9"
          }
        ]
      },
      {
        name: "Party ABE",
        value: "72",
        children: [
          {
            name: "CommitmentProcurementRole",
            value: "1"
          },
          {
            name: "Individual",
            value: "10"
          },
          {
            name: "IndividualName",
            value: "14"
          },
          {
            name: "Language",
            value: "3"
          },
          {
            name: "LanguageAbility",
            value: "5"
          },
          {
            name: "Logo",
            value: "2"
          },
          {
            name: "Organization",
            value: "6"
          },
          {
            name: "OrganizationName",
            value: "4"
          },
          {
            name: "Party",
            value: "3"
          },
          {
            name: "PartyName",
            value: "2"
          },
          {
            name: "PartyRole",
            value: "5"
          },
          {
            name: "PartyRoleAssociation",
            value: "4"
          },
          {
            name: "PartyRoleCategory",
            value: "2"
          },
          {
            name: "PartyRoleCurrency",
            value: "3"
          },
          {
            name: "PartyRoleSpecification",
            value: "4"
          },
          {
            name: "PlacePartyRoleAssoc",
            value: "4"
          }
        ]
      },
      {
        name: "Party ABE::Contact ABE",
        value: "15",
        children: [
          {
            name: "CompositePartyProfileTypeCharacteristic",
            value: "1"
          },
          {
            name: "ContactMedium",
            value: "2"
          },
          {
            name: "EmailContact",
            value: "3"
          },
          {
            name: "FaxNumber",
            value: "3"
          },
          {
            name: "PostalContact",
            value: "2"
          },
          {
            name: "TelephoneNumber",
            value: "4"
          }
        ]
      },
      {
        name: "Party ABE::Currency ABE",
        value: "19",
        children: [
          {
            name: "Currency",
            value: "3"
          },
          {
            name: "CurrencyExchangeRate",
            value: "6"
          },
          {
            name: "CurrencyName",
            value: "2"
          },
          {
            name: "CurrencyUnit",
            value: "5"
          },
          {
            name: "CurrencyUnitName",
            value: "2"
          },
          {
            name: "OrganizationDecompostionType",
            value: "1"
          }
        ]
      },
      {
        name: "Party ABE::Identification ABE",
        value: "55",
        children: [
          {
            name: "BirthCertificateIdentification",
            value: "5"
          },
          {
            name: "CompanyRegistration",
            value: "4"
          },
          {
            name: "ContractorIdentification",
            value: "5"
          },
          {
            name: "DriversLicenseIdentification",
            value: "5"
          },
          {
            name: "EmployeeIdentification",
            value: "6"
          },
          {
            name: "IndividualIdentification",
            value: "4"
          },
          {
            name: "NationalIdentityCardIdentification",
            value: "5"
          },
          {
            name: "OrganizationIdentification",
            value: "4"
          },
          {
            name: "PartyIdentification",
            value: "4"
          },
          {
            name: "PassportIdentification",
            value: "7"
          },
          {
            name: "SocialSecurityNrIdentification",
            value: "5"
          },
          {
            name: "TelephoneNumber",
            value: "1"
          }
        ]
      },
      {
        name: "Party ABE::Party Community ABE",
        value: "44",
        children: [
          {
            name: "AssetConsumerRole",
            value: "2"
          },
          {
            name: "AssetConsumption",
            value: "6"
          },
          {
            name: "AssetProviderRole",
            value: "2"
          },
          {
            name: "Community",
            value: "9"
          },
          {
            name: "CommunityAdministrator",
            value: "5"
          },
          {
            name: "CommunityMember",
            value: "9"
          },
          {
            name: "Contribution",
            value: "6"
          },
          {
            name: "ContributionProviderRole",
            value: "2"
          },
          {
            name: "ContributionReceiverRole",
            value: "2"
          },
          {
            name: "PartyRoleCurrency",
            value: "1"
          }
        ]
      },
      {
        name: "Party ABE::Party Demographic ABE",
        value: "64",
        children: [
          {
            name: "AtomicDemographicCharacteristic",
            value: "11"
          },
          {
            name: "AtomicPartyDemographic",
            value: "6"
          },
          {
            name: "CompositeDemographicCharacteristic",
            value: "11"
          },
          {
            name: "CompositePartyDemographic",
            value: "6"
          },
          {
            name: "DemoCharacteristicValue",
            value: "9"
          },
          {
            name: "DemographicCharacteristic",
            value: "11"
          },
          {
            name: "PartyDemographic",
            value: "6"
          },
          {
            name: "PartyDemographicValue",
            value: "3"
          },
          {
            name: "Skill",
            value: "1"
          }
        ]
      },
      {
        name: "Party ABE::Party Organization ABE",
        value: "18",
        children: [
          {
            name: "AtomicOrganization",
            value: "6"
          },
          {
            name: "BusinessOperationEntity",
            value: "1"
          },
          {
            name: "CompositeOrganization",
            value: "6"
          },
          {
            name: "OrganizationDecompostionComponent",
            value: "2"
          },
          {
            name: "OrganizationDecompostionType",
            value: "3"
          }
        ]
      },
      {
        name: "Party ABE::Party Profile ABE",
        value: "55",
        children: [
          {
            name: "AtomicPartyDemographic",
            value: "1"
          },
          {
            name: "AtomicPartyProfileTypeCharacteristic",
            value: "11"
          },
          {
            name: "CompositePartyProfileTypeCharacteristic",
            value: "11"
          },
          {
            name: "PartyProfile",
            value: "6"
          },
          {
            name: "PartyProfileType",
            value: "6"
          },
          {
            name: "PartyProfileTypeCharacteristic",
            value: "11"
          },
          {
            name: "PartyProfileTypeCharacteristicValue",
            value: "9"
          }
        ]
      },
      {
        name: "Party ABE::Party Role Examples ABE",
        value: "91",
        children: [
          {
            name: "Administrator",
            value: "5"
          },
          {
            name: "BusinessOperationEntity",
            value: "6"
          },
          {
            name: "Buyer",
            value: "5"
          },
          {
            name: "ComplementaryProvider",
            value: "5"
          },
          {
            name: "Employee",
            value: "5"
          },
          {
            name: "FunctionOrProcessProvider",
            value: "5"
          },
          {
            name: "Intermediary",
            value: "5"
          },
          {
            name: "OrganizationPost",
            value: "6"
          },
          {
            name: "Partner",
            value: "5"
          },
          {
            name: "PassportIdentification",
            value: "1"
          },
          {
            name: "ResourceInstaller",
            value: "5"
          },
          {
            name: "ServiceProvider",
            value: "5"
          },
          {
            name: "ServiceProviderEmployee",
            value: "8"
          },
          {
            name: "Supplier",
            value: "5"
          },
          {
            name: "Technician",
            value: "5"
          },
          {
            name: "TelecomTechnician",
            value: "5"
          },
          {
            name: "ThirdPartyServiceProvider",
            value: "5"
          },
          {
            name: "Vendor",
            value: "5"
          }
        ]
      },
      {
        name: "Party ABE::Party Role Group ABE",
        value: "32",
        children: [
          {
            name: "CurrencyUnitName",
            value: "1"
          },
          {
            name: "PRGSpecClub",
            value: "4"
          },
          {
            name: "PRGSpecFamily",
            value: "4"
          },
          {
            name: "PRGSpecFriends",
            value: "4"
          },
          {
            name: "PRGSpecRule",
            value: "10"
          },
          {
            name: "PartyRoleGroup",
            value: "5"
          },
          {
            name: "PartyRoleGroupSpecification",
            value: "4"
          }
        ]
      },
      {
        name: "Party ABE::Skill ABE",
        value: "4",
        children: [
          {
            name: "AssetProviderRole",
            value: "1"
          },
          {
            name: "Skill",
            value: "1"
          },
          {
            name: "SkillCatalog",
            value: "1"
          },
          {
            name: "SkillSpecification",
            value: "1"
          }
        ]
      },
      {
        name: "Party Interaction ABE",
        value: "44",
        children: [
          {
            name: "InquiryRequest",
            value: "6"
          },
          {
            name: "InquiryResponse",
            value: "6"
          },
          {
            name: "PartyBillingInquiry",
            value: "6"
          },
          {
            name: "PartyDisputedAmount",
            value: "7"
          },
          {
            name: "PartyInquiry",
            value: "6"
          },
          {
            name: "PartyInvoiceInquiry",
            value: "6"
          },
          {
            name: "PartyQuote",
            value: "6"
          },
          {
            name: "ProductOrder",
            value: "1"
          }
        ]
      },
      {
        name: "Party Order ABE",
        value: "15",
        children: [
          {
            name: "PRGSpecFriends",
            value: "1"
          },
          {
            name: "PartyOrder",
            value: "11"
          },
          {
            name: "PartyOrderItem",
            value: "3"
          }
        ]
      },
      {
        name: "Party Order ABE::Example Party Order Entities ABE",
        value: "45",
        children: [
          {
            name: "AccessServiceRequest",
            value: "11"
          },
          {
            name: "DirectoryServiceRequest",
            value: "11"
          },
          {
            name: "LocalServiceRequest",
            value: "11"
          },
          {
            name: "PartyOrderItem",
            value: "1"
          },
          {
            name: "ProductOrder",
            value: "11"
          }
        ]
      },
      {
        name: "Party Privacy ABE",
        value: "1",
        children: [
          {
            name: "PurchaseProductSpecification",
            value: "1"
          }
        ]
      },
      {
        name: "Party Privacy ABE::Party Privacy Profile ABE",
        value: "19",
        children: [
          {
            name: "PartyPrivacyAgreement",
            value: "9"
          },
          {
            name: "PartyPrivacyProfile",
            value: "6"
          },
          {
            name: "PartyPrivacyProfileCharValue",
            value: "3"
          },
          {
            name: "PurchaseProductSpecification",
            value: "1"
          }
        ]
      },
      {
        name: "Party Privacy ABE::Party Privacy Profile Type ABE",
        value: "33",
        children: [
          {
            name: "PartyPrivacyAgreement",
            value: "1"
          },
          {
            name: "PartyPrivacyProfileType",
            value: "6"
          },
          {
            name: "PartyPrivacyProfileTypeCharValue",
            value: "10"
          },
          {
            name: "PartyPrivacyProfileTypeCharacteristic",
            value: "13"
          },
          {
            name: "PrivacyCategory",
            value: "1"
          },
          {
            name: "PrivacyUsagePurpose",
            value: "2"
          }
        ]
      },
      {
        name: "Party Problem ABE",
        value: "24",
        children: [
          {
            name: "ClosePartyProblemSummary",
            value: "4"
          },
          {
            name: "KnownProblemDescription",
            value: "3"
          },
          {
            name: "PartyProblem",
            value: "7"
          },
          {
            name: "PartyProblemTask",
            value: "5"
          },
          {
            name: "PartyProblemWorkaround",
            value: "4"
          },
          {
            name: "RevenueSharingModelRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Party Product Specification and Offering ABE",
        value: "1",
        children: [
          {
            name: "PartyProblemTask",
            value: "1"
          }
        ]
      },
      {
        name: "Party Product Specification and Offering ABE::Party Role Product Offering ABE",
        value: "15",
        children: [
          {
            name: "PartyProblemTask",
            value: "1"
          },
          {
            name: "PartyRoleProdOffRelationship",
            value: "3"
          },
          {
            name: "PartyRoleProductOffering",
            value: "11"
          }
        ]
      },
      {
        name:
          "Party Product Specification and Offering ABE::Party Role Product Offering ABE::Example Party Role Product Offering Entities ABE",
        value: "23",
        children: [
          {
            name: "PartyRoleProdOffRelationship",
            value: "1"
          },
          {
            name: "PurchaseProductOffering",
            value: "11"
          },
          {
            name: "SalesProductOffering",
            value: "11"
          }
        ]
      },
      {
        name: "Party Product Specification and Offering ABE::Party Role Product Specification ABE",
        value: "8",
        children: [
          {
            name: "PartyRoleProdSpecRelationship",
            value: "3"
          },
          {
            name: "PartyRoleProductSpecification",
            value: "4"
          },
          {
            name: "PurchaseProductOffering",
            value: "1"
          }
        ]
      },
      {
        name:
          "Party Product Specification and Offering ABE::Party Role Product Specification ABE::Example Party Role Product Spec Entities ABE",
        value: "17",
        children: [
          {
            name: "FulfilledSalesProdSpec",
            value: "4"
          },
          {
            name: "OrderedOnlySalesProdSpec",
            value: "4"
          },
          {
            name: "PartyRoleProdSpecRelationship",
            value: "1"
          },
          {
            name: "PurchaseProductSpecification",
            value: "4"
          },
          {
            name: "SalesProductSpecification",
            value: "4"
          }
        ]
      },
      {
        name: "Party Revenue ABE",
        value: "1",
        children: [
          {
            name: "ChurnRetentionStatistic",
            value: "1"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Applied Party Billing Rate ABE",
        value: "61",
        children: [
          {
            name: "AppliedPartyBillingAllowance",
            value: "4"
          },
          {
            name: "AppliedPartyBillingCharge",
            value: "4"
          },
          {
            name: "AppliedPartyBillingCredit",
            value: "4"
          },
          {
            name: "AppliedPartyBillingDiscount",
            value: "4"
          },
          {
            name: "AppliedPartyBillingProductAlteration",
            value: "4"
          },
          {
            name: "AppliedPartyBillingProductCharge",
            value: "4"
          },
          {
            name: "AppliedPartyBillingProductUsageRate",
            value: "4"
          },
          {
            name: "AppliedPartyBillingRate",
            value: "4"
          },
          {
            name: "AppliedPartyBillingRateSpec",
            value: "6"
          },
          {
            name: "AppliedPartyBillingRebate",
            value: "4"
          },
          {
            name: "AppliedPartyBillingTaxRate",
            value: "5"
          },
          {
            name: "AppliedPartyPenaltyCharge",
            value: "4"
          },
          {
            name: "AtomicAppliedPartyBillingRate",
            value: "4"
          },
          {
            name: "CompositeAppliedPartyBillingRate",
            value: "4"
          },
          {
            name: "PartyFinancialCharge",
            value: "1"
          },
          {
            name: "UsageCharacteristicSumSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill ABE",
        value: "45",
        children: [
          {
            name: "BillingPeriod",
            value: "3"
          },
          {
            name: "HardDunning",
            value: "1"
          },
          {
            name: "OffCyclePartyBill",
            value: "9"
          },
          {
            name: "OnCyclePartyBill",
            value: "3"
          },
          {
            name: "PartyBill",
            value: "3"
          },
          {
            name: "PartyBillFormat",
            value: "3"
          },
          {
            name: "PartyBillPresentationMedia",
            value: "3"
          },
          {
            name: "PartyBillSpec",
            value: "4"
          },
          {
            name: "PartyBillingCycle",
            value: "7"
          },
          {
            name: "PartyBillingCycleSpecification",
            value: "9"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill ABE::Party Billing Credit ABE",
        value: "16",
        children: [
          {
            name: "PartyAllowance",
            value: "2"
          },
          {
            name: "PartyAllowanceBalance",
            value: "3"
          },
          {
            name: "PartyBillPresentationMedia",
            value: "1"
          },
          {
            name: "PartyBillingCredit",
            value: "2"
          },
          {
            name: "PartyBillingCreditBalance",
            value: "3"
          },
          {
            name: "PartyDiscount",
            value: "2"
          },
          {
            name: "PartyDiscountBalance",
            value: "3"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill ABE::Party Billing Statistic ABE",
        value: "40",
        children: [
          {
            name: "PartyAccountChargeSum",
            value: "2"
          },
          {
            name: "PartyAccountChargeSumBalance",
            value: "3"
          },
          {
            name: "PartyAccountChargeSumSpec",
            value: "5"
          },
          {
            name: "PartyBillingProductChargeSum",
            value: "2"
          },
          {
            name: "PartyBillingProductChargeSumBalance",
            value: "3"
          },
          {
            name: "PartyBillingProductChargeSumSpec",
            value: "5"
          },
          {
            name: "PartyBillingStatistic",
            value: "2"
          },
          {
            name: "PartyBillingStatisticBalance",
            value: "2"
          },
          {
            name: "PartyBillingStatisticSpec",
            value: "5"
          },
          {
            name: "PartyDiscount",
            value: "1"
          },
          {
            name: "UsageCharacteristicSum",
            value: "2"
          },
          {
            name: "UsageCharacteristicSumBalance",
            value: "3"
          },
          {
            name: "UsageCharacteristicSumSpec",
            value: "5"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill Collection ABE",
        value: "1",
        children: [
          {
            name: "ChurnRetentionStatistic",
            value: "1"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill Collection ABE::Dunning ABE",
        value: "36",
        children: [
          {
            name: "DigitalWalletPM",
            value: "1"
          },
          {
            name: "DunningCase",
            value: "3"
          },
          {
            name: "DunningCaseRule",
            value: "3"
          },
          {
            name: "DunningNotification",
            value: "7"
          },
          {
            name: "DunningRule",
            value: "10"
          },
          {
            name: "DunningScenario",
            value: "4"
          },
          {
            name: "DunningWriteOff",
            value: "2"
          },
          {
            name: "HardDunning",
            value: "3"
          },
          {
            name: "SoftDunning",
            value: "3"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill Collection ABE::Party Payment ABE",
        value: "30",
        children: [
          {
            name: "ChurnRetentionStatistic",
            value: "1"
          },
          {
            name: "PartyPayment",
            value: "8"
          },
          {
            name: "PartyPaymentItem",
            value: "2"
          },
          {
            name: "PaymentPlan",
            value: "11"
          },
          {
            name: "PaymentPlanPaymentMethod",
            value: "3"
          },
          {
            name: "ThirdPartyPaymentAgency",
            value: "5"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill Collection ABE::Party Payment ABE::Bank ABE",
        value: "9",
        children: [
          {
            name: "Bank",
            value: "4"
          },
          {
            name: "BankAccount",
            value: "4"
          },
          {
            name: "PaymentPlanPaymentMethod",
            value: "1"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Bill Collection ABE::Party Payment ABE::Payment Method ABE",
        value: "75",
        children: [
          {
            name: "AccountBalancePM",
            value: "5"
          },
          {
            name: "BankAccount",
            value: "1"
          },
          {
            name: "BankCardPM",
            value: "10"
          },
          {
            name: "CashPM",
            value: "6"
          },
          {
            name: "CheckPM",
            value: "6"
          },
          {
            name: "CreditCardPM",
            value: "10"
          },
          {
            name: "DebitCardPM",
            value: "10"
          },
          {
            name: "DigitalWalletPM",
            value: "5"
          },
          {
            name: "LoyaltyBurnPM",
            value: "5"
          },
          {
            name: "PaymentMethod",
            value: "5"
          },
          {
            name: "PaymentMethodSpecification",
            value: "5"
          },
          {
            name: "ThirdPartyCollectionPM",
            value: "7"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Revenue Sharing ABE",
        value: "1",
        children: [
          {
            name: "PartySettlementRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Revenue Sharing ABE::Party Revenue Share ABE",
        value: "40",
        children: [
          {
            name: "AggregateRevShareProdOffer",
            value: "3"
          },
          {
            name: "AggregateRevShareProdOfferItem",
            value: "3"
          },
          {
            name: "ComponentRevShareProdOffer",
            value: "3"
          },
          {
            name: "ComponentRevShareProdOfferItem",
            value: "3"
          },
          {
            name: "PartyRevenueShare",
            value: "5"
          },
          {
            name: "PartyRevenueShareAdjustment",
            value: "4"
          },
          {
            name: "PartyRevenueShareNotification",
            value: "6"
          },
          {
            name: "PartyRevenueShareProdOffer",
            value: "3"
          },
          {
            name: "PartyRevenueShareProdOfferItem",
            value: "3"
          },
          {
            name: "PartyRevenueShareRelationship",
            value: "3"
          },
          {
            name: "PartySettlementRelationship",
            value: "1"
          },
          {
            name: "RevenueShareProdOfferRelationship",
            value: "3"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Revenue Sharing ABE::Party Revenue Share Reconciliation ABE",
        value: "21",
        children: [
          {
            name: "PartyRevShareReconDiscrepancy",
            value: "6"
          },
          {
            name: "PartyRevShareReconciliationItem",
            value: "2"
          },
          {
            name: "PartyRevenueShareReconciliation",
            value: "6"
          },
          {
            name: "RevShareReconDiscrepNotification",
            value: "6"
          },
          {
            name: "RevenueShareProdOfferRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Revenue Sharing ABE::Party Revenue Sharing Agreement ABE",
        value: "20",
        children: [
          {
            name: "PartyRevShareTermOrCondition",
            value: "7"
          },
          {
            name: "PartyRevenueSharingAgreement",
            value: "9"
          },
          {
            name: "PartyRevenueSharingAgreementItem",
            value: "3"
          },
          {
            name: "RevShareReconDiscrepNotification",
            value: "1"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Revenue Sharing ABE::Party Revenue Sharing Model ABE",
        value: "27",
        children: [
          {
            name: "PartyRevShareTermOrCondition",
            value: "1"
          },
          {
            name: "PartyRevenueSharingModel",
            value: "7"
          },
          {
            name: "PartyRevenueSharingModelInvolvement",
            value: "3"
          },
          {
            name: "PartyRevenueSharingModelSpecification",
            value: "6"
          },
          {
            name: "RevShareModelSpecNegotiableRange",
            value: "7"
          },
          {
            name: "RevenueSharingModelRelationship",
            value: "3"
          }
        ]
      },
      {
        name: "Party Revenue ABE::Party Settlement ABE",
        value: "25",
        children: [
          {
            name: "AppliedPartyPenaltyCharge",
            value: "1"
          },
          {
            name: "PartySettlement",
            value: "4"
          },
          {
            name: "PartySettlementPayment",
            value: "1"
          },
          {
            name: "PartySettlementRelationship",
            value: "3"
          },
          {
            name: "PartySettlementRole",
            value: "2"
          },
          {
            name: "PartySettlementSpecRelationship",
            value: "3"
          },
          {
            name: "PartySettlementSpecVersion",
            value: "6"
          },
          {
            name: "PartySettlementSpecification",
            value: "5"
          }
        ]
      },
      {
        name: "Party Service Level Agreement ABE",
        value: "10",
        children: [
          {
            name: "PartyAccountCurrency",
            value: "1"
          },
          {
            name: "PartyServiceLevelAgreement",
            value: "9"
          }
        ]
      },
      {
        name: "Party Statistic ABE",
        value: "4",
        children: [
          {
            name: "ChurnRetentionStatistic",
            value: "3"
          },
          {
            name: "PartyServiceLevelAgreement",
            value: "1"
          }
        ]
      },
      {
        name: "Party Strategy ABE",
        value: "1",
        children: [
          {
            name: "PrivacyUsagePurpose",
            value: "1"
          }
        ]
      },
      {
        name: "Performance ABE",
        value: "66",
        children: [
          {
            name: "ConsequencePerformanceNotification",
            value: "6"
          },
          {
            name: "Performance",
            value: "2"
          },
          {
            name: "PerformanceCharacteristicValue",
            value: "3"
          },
          {
            name: "PerformanceIPAddress",
            value: "11"
          },
          {
            name: "PerformanceIndicator",
            value: "2"
          },
          {
            name: "PerformanceIndicatorGroup",
            value: "2"
          },
          {
            name: "PerformanceIndicatorRelationship",
            value: "4"
          },
          {
            name: "PerformanceMobileAddress",
            value: "10"
          },
          {
            name: "PerformanceNetworkAddress",
            value: "9"
          },
          {
            name: "PerformanceNotification",
            value: "6"
          },
          {
            name: "PerformancePointCode",
            value: "10"
          },
          {
            name: "TroubleTicketItem",
            value: "1"
          }
        ]
      },
      {
        name: "Performance ABE::Performance Category ABE",
        value: "12",
        children: [
          {
            name: "PerformanceCatCharacteristicValue",
            value: "3"
          },
          {
            name: "PerformanceCategory",
            value: "5"
          },
          {
            name: "PerformanceCategoryRelationship",
            value: "3"
          },
          {
            name: "PerformanceIndicatorGroup",
            value: "1"
          }
        ]
      },
      {
        name: "Performance ABE::Performance Category ABE::Performance Category Specification ABE",
        value: "11",
        children: [
          {
            name: "PerformanceCatSpecRelationship",
            value: "5"
          },
          {
            name: "PerformanceCatSpecification",
            value: "5"
          },
          {
            name: "PerformanceCategoryRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Performance ABE::Performance Monitoring ABE",
        value: "17",
        children: [
          {
            name: "MeasurementJob",
            value: "10"
          },
          {
            name: "MonitoredClassCriteria",
            value: "3"
          },
          {
            name: "MonitoredInstancesCriteria",
            value: "2"
          },
          {
            name: "MonitoredObjectsCriteria",
            value: "1"
          },
          {
            name: "PerformanceAlarmSpecification",
            value: "1"
          }
        ]
      },
      {
        name: "Performance ABE::Performance Monitoring ABE::Performance Collection ABE",
        value: "25",
        children: [
          {
            name: "AdhocCollection",
            value: "12"
          },
          {
            name: "MeasurementCollectionJob",
            value: "12"
          },
          {
            name: "MeasurementProductionJob",
            value: "1"
          }
        ]
      },
      {
        name: "Performance ABE::Performance Monitoring ABE::Performance Production ABE",
        value: "11",
        children: [
          {
            name: "MeasurementJob",
            value: "1"
          },
          {
            name: "MeasurementProductionJob",
            value: "10"
          }
        ]
      },
      {
        name: "Performance ABE::Performance Specification ABE",
        value: "43",
        children: [
          {
            name: "ConsequencePerformanceNotificationSpec",
            value: "5"
          },
          {
            name: "PerformanceCatSpecification",
            value: "1"
          },
          {
            name: "PerformanceIndicatorDerivationParameter",
            value: "1"
          },
          {
            name: "PerformanceIndicatorGroupSpecification",
            value: "2"
          },
          {
            name: "PerformanceIndicatorSpecRelationship",
            value: "3"
          },
          {
            name: "PerformanceIndicatorSpecification",
            value: "12"
          },
          {
            name: "PerformanceNotificationSpecification",
            value: "5"
          },
          {
            name: "PerformanceSpecIntervalConversion",
            value: "3"
          },
          {
            name: "PerformanceSpecification",
            value: "5"
          },
          {
            name: "PerformanceSpecificationInterval",
            value: "6"
          }
        ]
      },
      {
        name: "Performance ABE::Performance Threshold  ABE",
        value: "62",
        children: [
          {
            name: "MeasurementThresholdJob",
            value: "10"
          },
          {
            name: "PerformanceAlarmSpecification",
            value: "7"
          },
          {
            name: "PerformanceApplicability",
            value: "8"
          },
          {
            name: "PerformanceConsequence",
            value: "6"
          },
          {
            name: "PerformanceIndicatorGroupSpecification",
            value: "1"
          },
          {
            name: "PerformanceThreshold",
            value: "6"
          },
          {
            name: "PerformanceThresholdApplicability",
            value: "2"
          },
          {
            name: "PerformanceThresholdApplicabilityConsequence",
            value: "2"
          },
          {
            name: "PerformanceThresholdRule",
            value: "3"
          },
          {
            name: "PerformanceThresholdRuleDefinition",
            value: "12"
          },
          {
            name: "PerformanceThresholdRulePreDefined",
            value: "3"
          },
          {
            name: "PerformanceThresholdRulePreDefinedParam",
            value: "2"
          }
        ]
      },
      {
        name: "Policy ABE",
        value: "1",
        children: [
          {
            name: "TrackingRecord",
            value: "1"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Application ABE",
        value: "25",
        children: [
          {
            name: "BrokerCoordinationDetails",
            value: "6"
          },
          {
            name: "PolicyApplication",
            value: "4"
          },
          {
            name: "PolicyBroker",
            value: "4"
          },
          {
            name: "PolicyRepository",
            value: "6"
          },
          {
            name: "ScopedPolicyDetails",
            value: "4"
          },
          {
            name: "TrackingRecord",
            value: "1"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Application ABE::Policy Server ABE",
        value: "47",
        children: [
          {
            name: "BrokerCoordinationDetails",
            value: "1"
          },
          {
            name: "DecisionRequestedDetails",
            value: "6"
          },
          {
            name: "PEPDirectionDetails",
            value: "6"
          },
          {
            name: "PXPDirectionDetails",
            value: "6"
          },
          {
            name: "PXPEnforcementDetails",
            value: "6"
          },
          {
            name: "PolicyActionPerformedDetails",
            value: "6"
          },
          {
            name: "PolicyDecisionPoint",
            value: "4"
          },
          {
            name: "PolicyEnforcementPoint",
            value: "4"
          },
          {
            name: "PolicyExecutionPoint",
            value: "4"
          },
          {
            name: "PolicyServer",
            value: "4"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Application ABE::PolicyApp Role ABE",
        value: "43",
        children: [
          {
            name: "PXPEnforcementDetails",
            value: "1"
          },
          {
            name: "PolicyApplicationRole",
            value: "6"
          },
          {
            name: "PolicyBrokerRole",
            value: "6"
          },
          {
            name: "PolicyConfigActionRole",
            value: "6"
          },
          {
            name: "PolicyConfigDecisionRole",
            value: "6"
          },
          {
            name: "PolicyConfigRole",
            value: "6"
          },
          {
            name: "PolicyConfigValidationRole",
            value: "6"
          },
          {
            name: "PolicyServerRole",
            value: "6"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Framework ABE",
        value: "63",
        children: [
          {
            name: "ContainedPolicySetsDetail",
            value: "6"
          },
          {
            name: "Policy",
            value: "6"
          },
          {
            name: "PolicyAppliesToDetails",
            value: "6"
          },
          {
            name: "PolicyConfigRole",
            value: "1"
          },
          {
            name: "PolicyDomain",
            value: "4"
          },
          {
            name: "PolicyGroup",
            value: "8"
          },
          {
            name: "PolicyGroupExecutionDetails",
            value: "8"
          },
          {
            name: "PolicyRole",
            value: "6"
          },
          {
            name: "PolicyRuleBase",
            value: "10"
          },
          {
            name: "PolicySet",
            value: "8"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Framework ABE::Policy ABE",
        value: "11",
        children: [
          {
            name: "ContainedPolicySetsDetail",
            value: "1"
          },
          {
            name: "PolicyRule",
            value: "10"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Framework Spec ABE",
        value: "60",
        children: [
          {
            name: "PolicyActionSpec",
            value: "6"
          },
          {
            name: "PolicyConditionSpec",
            value: "6"
          },
          {
            name: "PolicyEventSpec",
            value: "6"
          },
          {
            name: "PolicyEventSpecAtomic",
            value: "6"
          },
          {
            name: "PolicyEventSpecComposite",
            value: "6"
          },
          {
            name: "PolicyEventSpecType",
            value: "4"
          },
          {
            name: "PolicyRuleSpec",
            value: "12"
          },
          {
            name: "PolicySetSpec",
            value: "7"
          },
          {
            name: "PolicyStatementSpec",
            value: "6"
          },
          {
            name: "ServiceManagementPolicy",
            value: "1"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Management ABE",
        value: "11",
        children: [
          {
            name: "PolicyStatement",
            value: "1"
          },
          {
            name: "ResourceManagementPolicy",
            value: "5"
          },
          {
            name: "ServiceManagementPolicy",
            value: "5"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Structure ABE",
        value: "1",
        children: [
          {
            name: "PolicyRule",
            value: "1"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Structure ABE::Policy Action ABE",
        value: "45",
        children: [
          {
            name: "ContainedPolicyActionDetails",
            value: "5"
          },
          {
            name: "EventEmitDetails",
            value: "1"
          },
          {
            name: "PolicyAction",
            value: "6"
          },
          {
            name: "PolicyActionAtomic",
            value: "9"
          },
          {
            name: "PolicyActionComposite",
            value: "10"
          },
          {
            name: "PolicyActionRuleDetails",
            value: "5"
          },
          {
            name: "PolicyActionVendor",
            value: "9"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Structure ABE::Policy Condition ABE",
        value: "35",
        children: [
          {
            name: "ContainedPolicyConditionDetails",
            value: "6"
          },
          {
            name: "PolicyAction",
            value: "1"
          },
          {
            name: "PolicyCondition",
            value: "6"
          },
          {
            name: "PolicyConditionAtomic",
            value: "9"
          },
          {
            name: "PolicyConditionComposite",
            value: "7"
          },
          {
            name: "PolicyConditionRuleDetails",
            value: "6"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Structure ABE::Policy Event ABE",
        value: "47",
        children: [
          {
            name: "EventEmitDetails",
            value: "6"
          },
          {
            name: "EventTriggerDetails",
            value: "9"
          },
          {
            name: "PolicyEvent",
            value: "8"
          },
          {
            name: "PolicyEventAtomic",
            value: "8"
          },
          {
            name: "PolicyEventBase",
            value: "7"
          },
          {
            name: "PolicyEventComposite",
            value: "8"
          },
          {
            name: "ValueConstraintDetails",
            value: "1"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Structure ABE::Policy Statement ABE",
        value: "19",
        children: [
          {
            name: "OperatorConstraintDetails",
            value: "5"
          },
          {
            name: "PolicyConditionRuleDetails",
            value: "1"
          },
          {
            name: "PolicyOperator",
            value: "7"
          },
          {
            name: "PolicyStatement",
            value: "6"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Structure ABE::Policy Value ABE",
        value: "71",
        children: [
          {
            name: "BitStringValue",
            value: "7"
          },
          {
            name: "BooleanValue",
            value: "7"
          },
          {
            name: "IPAddressValue",
            value: "9"
          },
          {
            name: "IntegerValue",
            value: "7"
          },
          {
            name: "MACAddressValue",
            value: "8"
          },
          {
            name: "PolicyValue",
            value: "6"
          },
          {
            name: "StringValue",
            value: "7"
          },
          {
            name: "ValueConstraintDetails",
            value: "5"
          },
          {
            name: "ValueCustom",
            value: "8"
          },
          {
            name: "ValueStandard",
            value: "6"
          },
          {
            name: "VariableStandard",
            value: "1"
          }
        ]
      },
      {
        name: "Policy ABE::Policy Structure ABE::Policy Variable ABE",
        value: "165",
        children: [
          {
            name: "1qCoSVariable",
            value: "7"
          },
          {
            name: "BitStringVariable",
            value: "8"
          },
          {
            name: "DNVariable",
            value: "8"
          },
          {
            name: "DSCPVariable",
            value: "7"
          },
          {
            name: "EtherTypeVariable",
            value: "7"
          },
          {
            name: "IPProtocolVariable",
            value: "7"
          },
          {
            name: "IPToSVariable",
            value: "7"
          },
          {
            name: "IPVersionVariable",
            value: "7"
          },
          {
            name: "IPv4Variable",
            value: "10"
          },
          {
            name: "IPv6FlowIDVariable",
            value: "9"
          },
          {
            name: "IPv6Variable",
            value: "10"
          },
          {
            name: "MACVariable",
            value: "9"
          },
          {
            name: "PolicyConditionTimePeriod",
            value: "13"
          },
          {
            name: "PolicyConditionVendor",
            value: "11"
          },
          {
            name: "PolicyRule",
            value: "1"
          },
          {
            name: "PolicyVariable",
            value: "6"
          },
          {
            name: "PortVariable",
            value: "8"
          },
          {
            name: "StringVariable",
            value: "8"
          },
          {
            name: "VLANVariable",
            value: "7"
          },
          {
            name: "VariableCustom",
            value: "8"
          },
          {
            name: "VariableStandard",
            value: "7"
          }
        ]
      },
      {
        name: "Product ABE",
        value: "28",
        children: [
          {
            name: "MatrixSpecDimension",
            value: "1"
          },
          {
            name: "Product",
            value: "6"
          },
          {
            name: "ProductBundle",
            value: "6"
          },
          {
            name: "ProductCharacteristicValue",
            value: "3"
          },
          {
            name: "ProductComponent",
            value: "6"
          },
          {
            name: "ProductInvolvementRole",
            value: "3"
          },
          {
            name: "ProductRelationship",
            value: "3"
          }
        ]
      },
      {
        name: "Product ABE::Product Price ABE",
        value: "45",
        children: [
          {
            name: "AllowanceProdPriceAlteration",
            value: "7"
          },
          {
            name: "ComponentProdPrice",
            value: "7"
          },
          {
            name: "CompositeProdPrice",
            value: "4"
          },
          {
            name: "DiscountProdPriceAlteration",
            value: "7"
          },
          {
            name: "ProdPriceAlteration",
            value: "7"
          },
          {
            name: "ProdPriceCharge",
            value: "7"
          },
          {
            name: "ProductPrice",
            value: "4"
          },
          {
            name: "ProductPricePartyRole",
            value: "1"
          },
          {
            name: "ProductRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Product Configuration ABE",
        value: "12",
        children: [
          {
            name: "LoyaltyProgramMember",
            value: "1"
          },
          {
            name: "ProductConfigSpec",
            value: "6"
          },
          {
            name: "ProductConfiguration",
            value: "5"
          }
        ]
      },
      {
        name: "Product Configuration ABE::Product Action ABE",
        value: "5",
        children: [
          {
            name: "AllowedProductAction",
            value: "1"
          },
          {
            name: "ProductActionType",
            value: "2"
          },
          {
            name: "ProductConfigSpecAction",
            value: "1"
          },
          {
            name: "ProductConfiguration",
            value: "1"
          }
        ]
      },
      {
        name: "Product Domain",
        value: "1",
        children: [
          {
            name: "ResourceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Product Offering ABE",
        value: "31",
        children: [
          {
            name: "BundledProdOfferOption",
            value: "3"
          },
          {
            name: "BundledProductOffering",
            value: "6"
          },
          {
            name: "DistChannelProdOffer",
            value: "2"
          },
          {
            name: "DistributionChannel",
            value: "3"
          },
          {
            name: "ProductOffering",
            value: "6"
          },
          {
            name: "ProductOfferingRelationship",
            value: "3"
          },
          {
            name: "ProductOfferingTerm",
            value: "1"
          },
          {
            name: "RatePlanProductSpec",
            value: "1"
          },
          {
            name: "SimpleProductOffering",
            value: "6"
          }
        ]
      },
      {
        name: "Product Offering ABE::Pricing Logic Algorithm ABE",
        value: "29",
        children: [
          {
            name: "MatrixCellCharValue",
            value: "3"
          },
          {
            name: "MatrixCharValue",
            value: "3"
          },
          {
            name: "MatrixCharValueIndex",
            value: "2"
          },
          {
            name: "OneTimeRatingPLA",
            value: "5"
          },
          {
            name: "PricingLogicAlgorithm",
            value: "5"
          },
          {
            name: "ProductCatalog",
            value: "1"
          },
          {
            name: "RecurringRatingPLA",
            value: "5"
          },
          {
            name: "UsageRatingPLA",
            value: "5"
          }
        ]
      },
      {
        name: "Product Offering ABE::Pricing Logic Algorithm ABE::PLA Spec ABE",
        value: "39",
        children: [
          {
            name: "MatrixCharValueIndex",
            value: "1"
          },
          {
            name: "MatrixCharacteristicSpec",
            value: "11"
          },
          {
            name: "MatrixSpecDimension",
            value: "3"
          },
          {
            name: "OneTimePLASpec",
            value: "6"
          },
          {
            name: "PricingLogicAlgorithmSpec",
            value: "6"
          },
          {
            name: "RecurringPLASpec",
            value: "6"
          },
          {
            name: "UsagePLASpec",
            value: "6"
          }
        ]
      },
      {
        name: "Product Offering ABE::Product Catalog ABE",
        value: "17",
        children: [
          {
            name: "ProdCatProdOffer",
            value: "2"
          },
          {
            name: "ProductCatalog",
            value: "7"
          },
          {
            name: "ProductCatalogSpecification",
            value: "7"
          },
          {
            name: "ProductPlacement",
            value: "1"
          }
        ]
      },
      {
        name: "Product Offering ABE::Product Offering Price ABE",
        value: "88",
        children: [
          {
            name: "AllowanceProdOfferPriceAlteration",
            value: "7"
          },
          {
            name: "AlternateProdOfferPriceCharge",
            value: "7"
          },
          {
            name: "ComponentProdOfferPrice",
            value: "7"
          },
          {
            name: "CompositeProdOfferPrice",
            value: "4"
          },
          {
            name: "DiscountProdOfferPriceAlteration",
            value: "7"
          },
          {
            name: "FeeProdOfferingPrice",
            value: "7"
          },
          {
            name: "OneTimeChargeProdOfferPriceCharge",
            value: "7"
          },
          {
            name: "PriceEvent",
            value: "1"
          },
          {
            name: "ProdOfferPriceAlteration",
            value: "7"
          },
          {
            name: "ProdOfferPriceCharge",
            value: "7"
          },
          {
            name: "ProductOfferingPrice",
            value: "4"
          },
          {
            name: "ProductOfferingRelationship",
            value: "1"
          },
          {
            name: "RecurringChargeProdOfferPriceCharge",
            value: "8"
          },
          {
            name: "SimpleUsageProdOfferPriceCharge",
            value: "7"
          },
          {
            name: "TariffUsageProdOfferPriceCharge",
            value: "7"
          }
        ]
      },
      {
        name: "Product Offering ABE::Product Offering Price Rule ABE",
        value: "33",
        children: [
          {
            name: "AlternateProdOfferPriceCharge",
            value: "1"
          },
          {
            name: "ProdOfferPriceAction",
            value: "9"
          },
          {
            name: "ProdOfferPriceCondition",
            value: "10"
          },
          {
            name: "ProdOfferPricePolicyValue",
            value: "6"
          },
          {
            name: "ProdOfferPricePolicyVariable",
            value: "7"
          }
        ]
      },
      {
        name: "Product Offering ABE::Product Placement ABE",
        value: "2",
        children: [
          {
            name: "ProductPlacement",
            value: "1"
          },
          {
            name: "ProductPromotion",
            value: "1"
          }
        ]
      },
      {
        name: "Product Offering ABE::Product Promotion ABE",
        value: "2",
        children: [
          {
            name: "ProdOfferPriceAction",
            value: "1"
          },
          {
            name: "ProductPromotion",
            value: "1"
          }
        ]
      },
      {
        name: "Product Performance ABE",
        value: "1",
        children: [
          {
            name: "ProductTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Product Specification ABE",
        value: "94",
        children: [
          {
            name: "AtomicProductSpecification",
            value: "7"
          },
          {
            name: "CompositeProductSpecification",
            value: "7"
          },
          {
            name: "ConfigurableProductSpecCharacteristic",
            value: "11"
          },
          {
            name: "ProdSpecCharValueRelationship",
            value: "3"
          },
          {
            name: "ProdSpecCharValueUse",
            value: "3"
          },
          {
            name: "ProductCategory",
            value: "3"
          },
          {
            name: "ProductLine",
            value: "3"
          },
          {
            name: "ProductSpecCharRelationship",
            value: "4"
          },
          {
            name: "ProductSpecCharUse",
            value: "10"
          },
          {
            name: "ProductSpecCharacteristic",
            value: "11"
          },
          {
            name: "ProductSpecCharacteristicValue",
            value: "9"
          },
          {
            name: "ProductSpecification",
            value: "7"
          },
          {
            name: "ProductSpecificationCost",
            value: "3"
          },
          {
            name: "ProductSpecificationRelationship",
            value: "3"
          },
          {
            name: "ProductSpecificationType",
            value: "3"
          },
          {
            name: "ProductSpecificationVersion",
            value: "6"
          },
          {
            name: "ResourceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Product Specification ABE::Example Product Specification Entities ABE",
        value: "57",
        children: [
          {
            name: "DirectoryProductSpec",
            value: "7"
          },
          {
            name: "FieldOperationProductSpec",
            value: "7"
          },
          {
            name: "FixedQuantityPackageProductSpec",
            value: "7"
          },
          {
            name: "GoodsProductSpec",
            value: "7"
          },
          {
            name: "NetworkProductSpec",
            value: "7"
          },
          {
            name: "ProductSpecificationRelationship",
            value: "1"
          },
          {
            name: "RatePlanProductSpec",
            value: "7"
          },
          {
            name: "ServiceLevelProductSpec",
            value: "7"
          },
          {
            name: "ShippingProductSpec",
            value: "7"
          }
        ]
      },
      {
        name: "Product Test ABE",
        value: "8",
        children: [
          {
            name: "ProductConfigSpecAction",
            value: "1"
          },
          {
            name: "ProductTest",
            value: "6"
          },
          {
            name: "ProductTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Product Usage ABE",
        value: "10",
        children: [
          {
            name: "ProductBundleUsage",
            value: "3"
          },
          {
            name: "ProductComponentUsage",
            value: "3"
          },
          {
            name: "ProductOfferingStrategy",
            value: "1"
          },
          {
            name: "ProductUsage",
            value: "3"
          }
        ]
      },
      {
        name: "Product Usage ABE::Product Usage Spec ABE",
        value: "16",
        children: [
          {
            name: "AtomicProductUsageSpec",
            value: "5"
          },
          {
            name: "CompositeProductUsageSpec",
            value: "5"
          },
          {
            name: "ProductComponentUsage",
            value: "1"
          },
          {
            name: "ProductUsageSpec",
            value: "5"
          }
        ]
      },
      {
        name: "Project ABE",
        value: "137",
        children: [
          {
            name: "Action",
            value: "1"
          },
          {
            name: "BusinessDeliverable",
            value: "3"
          },
          {
            name: "CompoundWorksProgram",
            value: "5"
          },
          {
            name: "Cost",
            value: "8"
          },
          {
            name: "Energy",
            value: "12"
          },
          {
            name: "InvestmentDriver",
            value: "1"
          },
          {
            name: "Labour",
            value: "12"
          },
          {
            name: "Material",
            value: "1"
          },
          {
            name: "MaterialSpec",
            value: "13"
          },
          {
            name: "Milestone",
            value: "18"
          },
          {
            name: "Motivation",
            value: "1"
          },
          {
            name: "PartyResource",
            value: "6"
          },
          {
            name: "PerformanceMeasure",
            value: "1"
          },
          {
            name: "Plan",
            value: "1"
          },
          {
            name: "ProductActivityUsage",
            value: "2"
          },
          {
            name: "ProductResourceUsage",
            value: "2"
          },
          {
            name: "ProductSpecActivitySpecAllocation",
            value: "2"
          },
          {
            name: "ProductSpecActivitySpecParamUsage",
            value: "3"
          },
          {
            name: "ProductSpecResourceSpecUsage",
            value: "3"
          },
          {
            name: "ProjectEquipment",
            value: "12"
          },
          {
            name: "ProjectRisk",
            value: "7"
          },
          {
            name: "SimpleWorksProgram",
            value: "5"
          },
          {
            name: "SpatialReferenceSystem",
            value: "1"
          },
          {
            name: "Supplies",
            value: "12"
          },
          {
            name: "WorksProgram",
            value: "5"
          }
        ]
      },
      {
        name: "Project ABE::Activity ABE",
        value: "123",
        children: [
          {
            name: "AbandonedActivityStatus",
            value: "3"
          },
          {
            name: "Activity",
            value: "16"
          },
          {
            name: "ActivityEventEntry",
            value: "15"
          },
          {
            name: "ActivityParameterUsage",
            value: "2"
          },
          {
            name: "ActivityResourceUsage",
            value: "2"
          },
          {
            name: "ActivitySpec",
            value: "9"
          },
          {
            name: "ActivitySpecCostParameter",
            value: "6"
          },
          {
            name: "ActivityStatus",
            value: "3"
          },
          {
            name: "CompletedActivityStatus",
            value: "3"
          },
          {
            name: "CompoundActivity",
            value: "16"
          },
          {
            name: "CompoundActivitySpec",
            value: "9"
          },
          {
            name: "ImplementedActivityStatus",
            value: "3"
          },
          {
            name: "ProposedActivityStatus",
            value: "3"
          },
          {
            name: "SimpleActivity",
            value: "18"
          },
          {
            name: "SimpleActivitySpec",
            value: "9"
          },
          {
            name: "State/Activity Model",
            value: "1"
          },
          {
            name: "SuspendedActivityStatus",
            value: "4"
          },
          {
            name: "WorkOrderFulfillment",
            value: "1"
          }
        ]
      },
      {
        name: "Project ABE::Additional Relationships ABE",
        value: "1",
        children: [
          {
            name: "ProductAndServiceSelection",
            value: "1"
          }
        ]
      },
      {
        name: "Project ABE::EntitiesToBeFixedInPh4",
        value: "14",
        children: [
          {
            name: "Event",
            value: "1"
          },
          {
            name: "NetworkProblem",
            value: "3"
          },
          {
            name: "PerformanceException",
            value: "3"
          },
          {
            name: "ProductAndServiceSelection",
            value: "3"
          },
          {
            name: "SimpleWBSSpec",
            value: "1"
          },
          {
            name: "Trigger",
            value: "3"
          }
        ]
      },
      {
        name: "Project ABE::Project ABE",
        value: "81",
        children: [
          {
            name: "AtomicProjectDeliverable",
            value: "1"
          },
          {
            name: "AtomicVision",
            value: "1"
          },
          {
            name: "CompositeProjectDeliverable",
            value: "1"
          },
          {
            name: "CompositeVision",
            value: "1"
          },
          {
            name: "CompoundProject",
            value: "21"
          },
          {
            name: "Project",
            value: "21"
          },
          {
            name: "ProjectDeliverable",
            value: "1"
          },
          {
            name: "ProjectDeliverableVersion",
            value: "1"
          },
          {
            name: "ProjectElementSuccession",
            value: "1"
          },
          {
            name: "ProjectResourceUsage",
            value: "3"
          },
          {
            name: "ProjectScope",
            value: "1"
          },
          {
            name: "ProjectSpec",
            value: "6"
          },
          {
            name: "SimpleProject",
            value: "21"
          },
          {
            name: "Vision",
            value: "1"
          }
        ]
      },
      {
        name: "Project ABE::Project Calendar ABE",
        value: "52",
        children: [
          {
            name: "ProjectCalendar",
            value: "5"
          },
          {
            name: "ProjectSchedule",
            value: "4"
          },
          {
            name: "ProjectSpecificWorkCalendar",
            value: "4"
          },
          {
            name: "SpecialWorkPeriod",
            value: "17"
          },
          {
            name: "StandardWorkCalendar",
            value: "4"
          },
          {
            name: "StandardWorkPeriod",
            value: "17"
          },
          {
            name: "State/Activity Model",
            value: "1"
          }
        ]
      },
      {
        name: "Project ABE::Project Element ABE",
        value: "33",
        children: [
          {
            name: "ProjectElement",
            value: "13"
          },
          {
            name: "ProjectElementDependency",
            value: "4"
          },
          {
            name: "ProjectElementDivision",
            value: "2"
          },
          {
            name: "ProjectElementFusion",
            value: "2"
          },
          {
            name: "ProjectElementRelationship",
            value: "2"
          },
          {
            name: "ProjectElementSpec",
            value: "5"
          },
          {
            name: "ProjectElementSubstitution",
            value: "2"
          },
          {
            name: "ProjectElementSuccession",
            value: "2"
          },
          {
            name: "StandardWorkCalendar",
            value: "1"
          }
        ]
      },
      {
        name: "Project ABE::Project Resource ABE",
        value: "83",
        children: [
          {
            name: "ActivitySpecResourceSpecParameterUsage",
            value: "3"
          },
          {
            name: "AllocatedProjectResource",
            value: "4"
          },
          {
            name: "CompoundProjectResourceSpec",
            value: "12"
          },
          {
            name: "ConsumableProjectResource",
            value: "3"
          },
          {
            name: "GeneralProjectResourceAllocation",
            value: "3"
          },
          {
            name: "ProjectResource",
            value: "3"
          },
          {
            name: "ProjectResourceAllocation",
            value: "3"
          },
          {
            name: "ProjectResourceConsumptionAllocation",
            value: "3"
          },
          {
            name: "ProjectResourceHolding",
            value: "2"
          },
          {
            name: "ProjectResourcePool",
            value: "1"
          },
          {
            name: "ProjectResourceReservationAllocation",
            value: "8"
          },
          {
            name: "ProjectResourceSpec",
            value: "12"
          },
          {
            name: "ProjectScope",
            value: "1"
          },
          {
            name: "ResourceForProject",
            value: "1"
          },
          {
            name: "ResourceParameterUsage",
            value: "2"
          },
          {
            name: "ResourcePool",
            value: "1"
          },
          {
            name: "ResourceSpecCostParameter",
            value: "6"
          },
          {
            name: "SimpleProjectResourceSpec",
            value: "12"
          },
          {
            name: "SpecificProjectResourceAllocation",
            value: "3"
          }
        ]
      },
      {
        name: "Project ABE::Project Role ABE",
        value: "36",
        children: [
          {
            name: "ProjectConstructor",
            value: "5"
          },
          {
            name: "ProjectCustomer",
            value: "5"
          },
          {
            name: "ProjectManager",
            value: "5"
          },
          {
            name: "ProjectPartyRole",
            value: "5"
          },
          {
            name: "ProjectPlanner",
            value: "5"
          },
          {
            name: "ProjectResourceHolding",
            value: "1"
          },
          {
            name: "ProjectSponsor",
            value: "5"
          },
          {
            name: "ProjectTroubleShouter",
            value: "5"
          }
        ]
      },
      {
        name: "Project ABE::Project Scope ABE",
        value: "4",
        children: [
          {
            name: "SCRUM_WorkingIncrement",
            value: "1"
          },
          {
            name: "SIDABE",
            value: "1"
          },
          {
            name: "TAMApplication",
            value: "1"
          },
          {
            name: "eTOMProcessElement",
            value: "1"
          }
        ]
      },
      {
        name: "Project ABE::SCRUM Blade ABE",
        value: "60",
        children: [
          {
            name: "ProductAndServiceSelection",
            value: "1"
          },
          {
            name: "SCRUM_BacklogItem",
            value: "19"
          },
          {
            name: "SCRUM_Impediment",
            value: "4"
          },
          {
            name: "SCRUM_ProductOwner",
            value: "5"
          },
          {
            name: "SCRUM_ScrumMaster",
            value: "5"
          },
          {
            name: "SCRUM_Sprint",
            value: "1"
          },
          {
            name: "SCRUM_Task",
            value: "19"
          },
          {
            name: "SCRUM_Team",
            value: "5"
          },
          {
            name: "SCRUM_WorkingIncrement",
            value: "1"
          }
        ]
      },
      {
        name: "Project ABE::Work Breakdown Structure ABE",
        value: "72",
        children: [
          {
            name: "CompoundWBSElement",
            value: "16"
          },
          {
            name: "CompoundWBSSpec",
            value: "5"
          },
          {
            name: "ProjectPartyRole",
            value: "1"
          },
          {
            name: "SimpleWBSElement",
            value: "16"
          },
          {
            name: "SimpleWBSSpec",
            value: "5"
          },
          {
            name: "WBSElement",
            value: "16"
          },
          {
            name: "WBSElementSpec",
            value: "5"
          },
          {
            name: "WBSResourceUsage",
            value: "2"
          },
          {
            name: "WBSSpecActivityParamUsage",
            value: "3"
          },
          {
            name: "WBSSpecResourceSpecUsage",
            value: "3"
          }
        ]
      },
      {
        name: "Project ABE::Work Order ABE",
        value: "17",
        children: [
          {
            name: "GeneralWOFufillment",
            value: "1"
          },
          {
            name: "SpecificWOConsumptionFufillment",
            value: "1"
          },
          {
            name: "SpecificWOFufillment",
            value: "1"
          },
          {
            name: "SpecificWOUsageFufillment",
            value: "1"
          },
          {
            name: "WorkOrder",
            value: "8"
          },
          {
            name: "WorkOrderFulfillment",
            value: "1"
          },
          {
            name: "WorkOrderItem",
            value: "3"
          },
          {
            name: "WorksProgram",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE",
        value: "29",
        children: [
          {
            name: "AdminsterResourceDetails",
            value: "4"
          },
          {
            name: "OwnsResourceDetails",
            value: "4"
          },
          {
            name: "Resource",
            value: "5"
          },
          {
            name: "ResourceCharacteristicValue",
            value: "3"
          },
          {
            name: "ResourceInvolvementRole",
            value: "3"
          },
          {
            name: "ResourceRelationship",
            value: "3"
          },
          {
            name: "ResourceRole",
            value: "6"
          },
          {
            name: "ResourceUsageSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::CompoundResource ABE",
        value: "38",
        children: [
          {
            name: "CompoundResource",
            value: "6"
          },
          {
            name: "CompoundResourceRole",
            value: "6"
          },
          {
            name: "ResourceCollection",
            value: "6"
          },
          {
            name: "ResourceElement",
            value: "6"
          },
          {
            name: "ResourcePort",
            value: "7"
          },
          {
            name: "RolesDescribePhysicalResourceDetails",
            value: "1"
          },
          {
            name: "SoftBlackBox",
            value: "6"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE",
        value: "35",
        children: [
          {
            name: "ConnectionPoint",
            value: "1"
          },
          {
            name: "LogicalPhysicalResource",
            value: "5"
          },
          {
            name: "LogicalResource",
            value: "8"
          },
          {
            name: "ReplacementSet",
            value: "6"
          },
          {
            name: "ResourceFunction",
            value: "8"
          },
          {
            name: "ResourceRelationship",
            value: "1"
          },
          {
            name: "ResourceRolePartyRoleDetails",
            value: "6"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Address ABE",
        value: "56",
        children: [
          {
            name: "DeviceInterfacePPortDetails",
            value: "1"
          },
          {
            name: "IPAddress",
            value: "12"
          },
          {
            name: "IPv4Address",
            value: "13"
          },
          {
            name: "InterfaceNetworkAddressDetails",
            value: "6"
          },
          {
            name: "NetworkAddress",
            value: "8"
          },
          {
            name: "NetworkAddressSpecification",
            value: "5"
          },
          {
            name: "PointCode",
            value: "11"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Computing and Software ABE",
        value: "1",
        children: [
          {
            name: "ConnectionPoint",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Computing and Software ABE::Software Resource and Software ABE",
        value: "118",
        children: [
          {
            name: "API",
            value: "12"
          },
          {
            name: "AtomicInstalledSoftware",
            value: "20"
          },
          {
            name: "CompositeInstalledSoftware",
            value: "20"
          },
          {
            name: "ConnectionPoint",
            value: "1"
          },
          {
            name: "HostingPlatformRequirement",
            value: "8"
          },
          {
            name: "InstalledSoftware",
            value: "20"
          },
          {
            name: "PartyRoleSoftwareLicenseDetails",
            value: "7"
          },
          {
            name: "PartyRoleUsesProcessesDetails",
            value: "7"
          },
          {
            name: "RunningSoftwareStatistic",
            value: "3"
          },
          {
            name: "SoftConnectionPoint",
            value: "8"
          },
          {
            name: "SoftwareResource",
            value: "12"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Converged Network ABE",
        value: "112",
        children: [
          {
            name: "EndPoint",
            value: "5"
          },
          {
            name: "EndPointRole",
            value: "6"
          },
          {
            name: "EquipmentProtectionGroup",
            value: "1"
          },
          {
            name: "ForwardingRelationshipEncapsulation",
            value: "18"
          },
          {
            name: "FreConnectionless",
            value: "4"
          },
          {
            name: "FreControlPlane",
            value: "6"
          },
          {
            name: "FreProtection",
            value: "6"
          },
          {
            name: "LayerProtocolParameters",
            value: "3"
          },
          {
            name: "LayerTermination",
            value: "9"
          },
          {
            name: "MultiRouteManagement",
            value: "3"
          },
          {
            name: "NetworkForwardingDomain",
            value: "13"
          },
          {
            name: "Route",
            value: "6"
          },
          {
            name: "RoutingParameters",
            value: "2"
          },
          {
            name: "TerminationPointEncapsulation",
            value: "12"
          },
          {
            name: "TopologicalLink",
            value: "12"
          },
          {
            name: "TrafficMappingTable",
            value: "1"
          },
          {
            name: "TrafficMappingTableRow",
            value: "5"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Converged Network ABE::Class Diagrams",
        value: "1",
        children: [
          {
            name: "TrafficMappingTableRow",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Converged Network ABE::Informal Classes",
        value: "1",
        children: [
          {
            name: "TrafficMappingTableRow",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Converged Network ABE::Informal Classes::Example Classes",
        value: "79",
        children: [
          {
            name: "TrafficMappingTableRow",
            value: "1"
          },
          {
            name: "__CTP",
            value: "12"
          },
          {
            name: "__FTP",
            value: "12"
          },
          {
            name: "__ItuCTP",
            value: "9"
          },
          {
            name: "__ItuTTP",
            value: "9"
          },
          {
            name: "__PTP",
            value: "12"
          },
          {
            name: "__SNP",
            value: "12"
          },
          {
            name: "__SNPP",
            value: "12"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Converged Network ABE::Informal Classes::Placeholder Classes",
        value: "3",
        children: [
          {
            name: "Call",
            value: "1"
          },
          {
            name: "ConnectionParameterProfile",
            value: "1"
          },
          {
            name: "__SNPP",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Device Interface ABE",
        value: "178",
        children: [
          {
            name: "ATMInterface",
            value: "18"
          },
          {
            name: "DeviceInterface",
            value: "14"
          },
          {
            name: "DeviceInterfaceMgmtDetails",
            value: "6"
          },
          {
            name: "DeviceSubInterface",
            value: "15"
          },
          {
            name: "EthernetInterface",
            value: "21"
          },
          {
            name: "LogicalInterface",
            value: "14"
          },
          {
            name: "LoopbackInterface",
            value: "14"
          },
          {
            name: "MediaInterface",
            value: "17"
          },
          {
            name: "NullInterface",
            value: "14"
          },
          {
            name: "SerialInterface",
            value: "20"
          },
          {
            name: "ServiceDeviceInterfaceDetails",
            value: "3"
          },
          {
            name: "StatisticalEntity",
            value: "1"
          },
          {
            name: "TokenRingInterface",
            value: "21"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Device Interface ABE::Device Interface Association ABE",
        value: "35",
        children: [
          {
            name: "DeviceInterfacePPortDetails",
            value: "1"
          },
          {
            name: "DeviceInterfaceTPDetails",
            value: "1"
          },
          {
            name: "InterfaceBridgingProtocolDetails",
            value: "4"
          },
          {
            name: "InterfaceHybridRoutingDetails",
            value: "4"
          },
          {
            name: "InterfaceLANProtocolDetails",
            value: "4"
          },
          {
            name: "InterfaceLSRoutingDetails",
            value: "4"
          },
          {
            name: "InterfaceRoutedProtocolDetails",
            value: "4"
          },
          {
            name: "InterfaceSwitchingProtocolDetails",
            value: "4"
          },
          {
            name: "InterfaceWANProtocolDetails",
            value: "4"
          },
          {
            name: "ProtocolDeviceInterfaceDetails",
            value: "4"
          },
          {
            name: "ServiceDeviceInterfaceDetails",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Device Protocol Association ABE",
        value: "33",
        children: [
          {
            name: "DeviceBridgingProtocolDetails",
            value: "4"
          },
          {
            name: "DeviceDVRoutingDetails",
            value: "4"
          },
          {
            name: "DeviceHybridRoutingDetails",
            value: "4"
          },
          {
            name: "DeviceLSRoutingDetails",
            value: "4"
          },
          {
            name: "DeviceMgmtProtocolDetails",
            value: "4"
          },
          {
            name: "DevicePVRoutingDetails",
            value: "4"
          },
          {
            name: "DeviceRoutedProtocolDetails",
            value: "4"
          },
          {
            name: "DeviceSwitchingProtocolDetails",
            value: "4"
          },
          {
            name: "PointCode",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Logical Device ABE",
        value: "61",
        children: [
          {
            name: "DeviceBridgingProtocolDetails",
            value: "1"
          },
          {
            name: "LogicalDevice",
            value: "20"
          },
          {
            name: "LogicalDeviceAtomic",
            value: "20"
          },
          {
            name: "LogicalDeviceComposite",
            value: "20"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Logical Role ABE",
        value: "91",
        children: [
          {
            name: "AggregationInterface",
            value: "6"
          },
          {
            name: "CPELogicalDeviceRole",
            value: "6"
          },
          {
            name: "CoreInterface",
            value: "6"
          },
          {
            name: "DeviceInterfaceRole",
            value: "6"
          },
          {
            name: "EdgeInterface",
            value: "6"
          },
          {
            name: "FirewallRole",
            value: "6"
          },
          {
            name: "LogicalDeviceRole",
            value: "6"
          },
          {
            name: "LogicalResourceRole",
            value: "6"
          },
          {
            name: "PELogicalDeviceRole",
            value: "6"
          },
          {
            name: "PLogicalDeviceRole",
            value: "6"
          },
          {
            name: "RoutingRole",
            value: "6"
          },
          {
            name: "ServiceStatisticalInfo",
            value: "1"
          },
          {
            name: "SiteInterfaceRole",
            value: "6"
          },
          {
            name: "SwitchingRole",
            value: "6"
          },
          {
            name: "UserNameResourceRole",
            value: "6"
          },
          {
            name: "VPNLogicalDeviceRole",
            value: "6"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::LogicalResource Examples ABE",
        value: "11",
        children: [
          {
            name: "ResourceNumber",
            value: "1"
          },
          {
            name: "VirtualMemory",
            value: "10"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Managed Transmission ABE",
        value: "67",
        children: [
          {
            name: "Connection",
            value: "17"
          },
          {
            name: "ManagedTransmissionEntity",
            value: "15"
          },
          {
            name: "Pipe",
            value: "17"
          },
          {
            name: "SoftwareResource",
            value: "1"
          },
          {
            name: "Trail",
            value: "17"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Managed Transmission ABE::Termination Point ABE",
        value: "61",
        children: [
          {
            name: "ConnectionTerminationPoint",
            value: "22"
          },
          {
            name: "ManagedTransmissionEntity",
            value: "1"
          },
          {
            name: "TerminationPoint",
            value: "19"
          },
          {
            name: "TrailTerminationPoint",
            value: "19"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE",
        value: "1",
        children: [
          {
            name: "LogicalDeviceComposite",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Accounting ABE",
        value: "8",
        children: [
          {
            name: "AccountingInfo",
            value: "7"
          },
          {
            name: "ResourceStatisticalInfo",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Configuration ABE",
        value: "61",
        children: [
          {
            name: "AccountingInfo",
            value: "1"
          },
          {
            name: "BaseConfiguration",
            value: "7"
          },
          {
            name: "Command",
            value: "7"
          },
          {
            name: "CommandAtomic",
            value: "7"
          },
          {
            name: "CommandComposite",
            value: "7"
          },
          {
            name: "CommandConfigDetails",
            value: "7"
          },
          {
            name: "ConfigurationInfo",
            value: "7"
          },
          {
            name: "CurrentConfiguration",
            value: "7"
          },
          {
            name: "GlobalConfiguration",
            value: "11"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Management Method ABE",
        value: "36",
        children: [
          {
            name: "CLIMethod",
            value: "4"
          },
          {
            name: "CommandConfigDetails",
            value: "1"
          },
          {
            name: "DescribedMgmtInfoDetails",
            value: "4"
          },
          {
            name: "ManagementMethodEntity",
            value: "4"
          },
          {
            name: "ProprietaryMethod",
            value: "4"
          },
          {
            name: "RMONMethod",
            value: "4"
          },
          {
            name: "SNMPMethod",
            value: "4"
          },
          {
            name: "SupportedMgmtMethodDetail",
            value: "7"
          },
          {
            name: "TL1Method",
            value: "4"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Performance Info ABE",
        value: "8",
        children: [
          {
            name: "PerformanceInfo",
            value: "7"
          },
          {
            name: "SupportedMgmtMethodDetail",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Resource State ABE",
        value: "8",
        children: [
          {
            name: "LogicalDeviceComposite",
            value: "1"
          },
          {
            name: "ResourceStateInfo",
            value: "7"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Resource Statistical ABE",
        value: "8",
        children: [
          {
            name: "ResourceStateInfo",
            value: "1"
          },
          {
            name: "ResourceStatisticalInfo",
            value: "7"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Security ABE",
        value: "29",
        children: [
          {
            name: "AuditingEntity",
            value: "7"
          },
          {
            name: "AuthenticationEntity",
            value: "7"
          },
          {
            name: "AuthorizationEntity",
            value: "7"
          },
          {
            name: "PerformanceInfo",
            value: "1"
          },
          {
            name: "SecurityInfo",
            value: "7"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Service State ABE",
        value: "8",
        children: [
          {
            name: "AuditingEntity",
            value: "1"
          },
          {
            name: "ServiceStateInfo",
            value: "7"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Management Information ABE::Service Statistical Info ABE",
        value: "8",
        children: [
          {
            name: "ServiceStateInfo",
            value: "1"
          },
          {
            name: "ServiceStatisticalInfo",
            value: "7"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Network ABE",
        value: "100",
        children: [
          {
            name: "AutonomousSystem",
            value: "10"
          },
          {
            name: "ConnectionTerminationPoint",
            value: "1"
          },
          {
            name: "ExcludedPortsDetail",
            value: "5"
          },
          {
            name: "IPSubnet",
            value: "15"
          },
          {
            name: "LAN",
            value: "13"
          },
          {
            name: "LayerNetwork",
            value: "10"
          },
          {
            name: "Network",
            value: "10"
          },
          {
            name: "NetworkAtomic",
            value: "10"
          },
          {
            name: "NetworkComposite",
            value: "10"
          },
          {
            name: "NetworkDomain",
            value: "4"
          },
          {
            name: "SubNetwork",
            value: "12"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protection ABE",
        value: "29",
        children: [
          {
            name: "EquipmentProtectionGroup",
            value: "13"
          },
          {
            name: "ProtectionGroup",
            value: "15"
          },
          {
            name: "TIPConnectionTerminationPoint",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE",
        value: "14",
        children: [
          {
            name: "NetworkComposite",
            value: "1"
          },
          {
            name: "Protocol",
            value: "13"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::Bridging Protocols ABE",
        value: "66",
        children: [
          {
            name: "BridgingProtocol",
            value: "13"
          },
          {
            name: "RSRBridging",
            value: "13"
          },
          {
            name: "SRBridging",
            value: "13"
          },
          {
            name: "SRTBridging",
            value: "13"
          },
          {
            name: "TransparentBridging",
            value: "13"
          },
          {
            name: "WANProtocol",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::LAN Protocols ABE",
        value: "53",
        children: [
          {
            name: "Ethernet",
            value: "13"
          },
          {
            name: "FDDI",
            value: "13"
          },
          {
            name: "LANProtocol",
            value: "13"
          },
          {
            name: "TokenRing",
            value: "13"
          },
          {
            name: "TransparentBridging",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::Management Protocols ABE",
        value: "40",
        children: [
          {
            name: "IPX",
            value: "1"
          },
          {
            name: "ManagementProtocol",
            value: "13"
          },
          {
            name: "ProprietaryVendorProtocol",
            value: "13"
          },
          {
            name: "SNMP",
            value: "13"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::Routed Protocols ABE",
        value: "66",
        children: [
          {
            name: "AppleTalk",
            value: "13"
          },
          {
            name: "DecNET",
            value: "13"
          },
          {
            name: "IP",
            value: "13"
          },
          {
            name: "IPX",
            value: "13"
          },
          {
            name: "RoutedProtocol",
            value: "13"
          },
          {
            name: "RoutingProtocol",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::Routing Protocols ABE",
        value: "144",
        children: [
          {
            name: "BGP",
            value: "13"
          },
          {
            name: "DistanceVectorRoutingProtocol",
            value: "13"
          },
          {
            name: "EIGRP",
            value: "13"
          },
          {
            name: "HybridRoutingProtocol",
            value: "13"
          },
          {
            name: "IGRP",
            value: "13"
          },
          {
            name: "IS-IS",
            value: "13"
          },
          {
            name: "LinkStateRoutingProtocol",
            value: "13"
          },
          {
            name: "OSPF",
            value: "13"
          },
          {
            name: "PathVectorRoutingProtocol",
            value: "13"
          },
          {
            name: "Protocol",
            value: "1"
          },
          {
            name: "RIP",
            value: "13"
          },
          {
            name: "RoutingProtocol",
            value: "13"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::Signaling Protocols ABE",
        value: "41",
        children: [
          {
            name: "COPS",
            value: "13"
          },
          {
            name: "ManagementProtocol",
            value: "1"
          },
          {
            name: "RSVP",
            value: "14"
          },
          {
            name: "SignalingProtocol",
            value: "13"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::Switching Protocols ABE",
        value: "27",
        children: [
          {
            name: "FDDI",
            value: "1"
          },
          {
            name: "MPLS",
            value: "13"
          },
          {
            name: "SwitchingProtocol",
            value: "13"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Protocol Service ABE::WAN Protocols ABE",
        value: "118",
        children: [
          {
            name: "ATM",
            value: "13"
          },
          {
            name: "FrameRelay",
            value: "13"
          },
          {
            name: "HDLC",
            value: "13"
          },
          {
            name: "ISDN",
            value: "13"
          },
          {
            name: "PPP",
            value: "13"
          },
          {
            name: "SLIP",
            value: "13"
          },
          {
            name: "SMDS",
            value: "13"
          },
          {
            name: "SignalingProtocol",
            value: "1"
          },
          {
            name: "WANProtocol",
            value: "13"
          },
          {
            name: "X25",
            value: "13"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Resource Number ABE",
        value: "16",
        children: [
          {
            name: "Call",
            value: "1"
          },
          {
            name: "ResourceNumber",
            value: "9"
          },
          {
            name: "ResourceNumberSpecification",
            value: "6"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::Statistics ABE",
        value: "5",
        children: [
          {
            name: "MPLS",
            value: "1"
          },
          {
            name: "StatisticalEntity",
            value: "4"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::TIP Logical Resource ABE",
        value: "1",
        children: [
          {
            name: "UserNameResourceRole",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::LogicalResource ABE::TIP Logical Resource ABE::Network Resource Fulfillment ABE",
        value: "210",
        children: [
          {
            name: "FloatingTerminationPoint",
            value: "18"
          },
          {
            name: "FlowDomain",
            value: "12"
          },
          {
            name: "FlowDomainFragment",
            value: "17"
          },
          {
            name: "GroupTerminationPoint",
            value: "11"
          },
          {
            name: "ManagedElement",
            value: "1"
          },
          {
            name: "MatrixFlowDomain",
            value: "12"
          },
          {
            name: "MultiLayerSubNetwork",
            value: "11"
          },
          {
            name: "PhysicalTerminationPoint",
            value: "16"
          },
          {
            name: "Route",
            value: "9"
          },
          {
            name: "SubNetworkConnection",
            value: "30"
          },
          {
            name: "TIPConnectionTerminationPoint",
            value: "18"
          },
          {
            name: "TIPTerminationPoint",
            value: "16"
          },
          {
            name: "TerminationPointPool",
            value: "12"
          },
          {
            name: "TopologicalLink",
            value: "12"
          },
          {
            name: "TrafficConditioningProfile",
            value: "3"
          },
          {
            name: "TransmissionDescriptor",
            value: "11"
          },
          {
            name: "UserNameResourceRole",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE",
        value: "55",
        children: [
          {
            name: "ElectronicConnectionPoint",
            value: "10"
          },
          {
            name: "PhysicalBlackBox",
            value: "10"
          },
          {
            name: "PhysicalLink",
            value: "14"
          },
          {
            name: "PhysicalResource",
            value: "10"
          },
          {
            name: "SoftwareSupportPackage",
            value: "10"
          },
          {
            name: "VirtualMemory",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Auxiliary Component ABE",
        value: "116",
        children: [
          {
            name: "AuxiliaryComponent",
            value: "25"
          },
          {
            name: "CoolingDevice",
            value: "26"
          },
          {
            name: "ElectronicConnectionPoint",
            value: "1"
          },
          {
            name: "Fan",
            value: "29"
          },
          {
            name: "PowerSupply",
            value: "35"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Equipment ABE",
        value: "314",
        children: [
          {
            name: "Card",
            value: "53"
          },
          {
            name: "CardOnCardDetails",
            value: "7"
          },
          {
            name: "Chassis",
            value: "1"
          },
          {
            name: "Equipment",
            value: "41"
          },
          {
            name: "MemoryCard",
            value: "53"
          },
          {
            name: "NetworkCard",
            value: "53"
          },
          {
            name: "SystemCard",
            value: "53"
          },
          {
            name: "UnknownCard",
            value: "53"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Equipment Holder ABE",
        value: "39",
        children: [
          {
            name: "Backplane",
            value: "1"
          },
          {
            name: "EquipmentHolder",
            value: "38"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Equipment Holder ABE::HolderAtomic ABE",
        value: "92",
        children: [
          {
            name: "AdjacentSlotDetails",
            value: "7"
          },
          {
            name: "EquipmentHolder",
            value: "1"
          },
          {
            name: "HolderAtomic",
            value: "40"
          },
          {
            name: "Slot",
            value: "44"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Equipment Holder ABE::HolderComposite ABE",
        value: "282",
        children: [
          {
            name: "AdjacentSlotDetails",
            value: "1"
          },
          {
            name: "Bay",
            value: "41"
          },
          {
            name: "Chassis",
            value: "53"
          },
          {
            name: "ChassisPosition",
            value: "6"
          },
          {
            name: "HolderComposite",
            value: "41"
          },
          {
            name: "Rack",
            value: "51"
          },
          {
            name: "SecureHolder",
            value: "48"
          },
          {
            name: "Shelf",
            value: "41"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Hardware ABE",
        value: "126",
        children: [
          {
            name: "Cable",
            value: "14"
          },
          {
            name: "Hardware",
            value: "16"
          },
          {
            name: "ManagedHardware",
            value: "22"
          },
          {
            name: "PhysicalConnector",
            value: "21"
          },
          {
            name: "PhysicalContainer",
            value: "25"
          },
          {
            name: "PhysicalPort",
            value: "27"
          },
          {
            name: "UnknownCard",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Physical Capacity ABE",
        value: "19",
        children: [
          {
            name: "PhysicalCapacity",
            value: "2"
          },
          {
            name: "PhysicalCapacityDetails",
            value: "6"
          },
          {
            name: "PhysicalMemoryCapacity",
            value: "5"
          },
          {
            name: "PhysicalPort",
            value: "1"
          },
          {
            name: "PowerCapacity",
            value: "5"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Physical Component ABE",
        value: "164",
        children: [
          {
            name: "ASIC",
            value: "29"
          },
          {
            name: "AuxiliaryComponent",
            value: "1"
          },
          {
            name: "Backplane",
            value: "26"
          },
          {
            name: "Chip",
            value: "27"
          },
          {
            name: "FlashDisk",
            value: "27"
          },
          {
            name: "MemoryComponent",
            value: "28"
          },
          {
            name: "PhysicalComponent",
            value: "26"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Physical Device ABE",
        value: "51",
        children: [
          {
            name: "PhysicalDevice",
            value: "16"
          },
          {
            name: "PhysicalDeviceAtomic",
            value: "16"
          },
          {
            name: "PhysicalDeviceComposite",
            value: "18"
          },
          {
            name: "PhysicalMemoryCapacity",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::PhysicalResource ABE::Physical Role ABE",
        value: "83",
        children: [
          {
            name: "CPEPhysicalDeviceRole",
            value: "7"
          },
          {
            name: "HardwareRole",
            value: "6"
          },
          {
            name: "PEPhysicalDeviceRole",
            value: "7"
          },
          {
            name: "PPhysicalDeviceRole",
            value: "7"
          },
          {
            name: "PhysicalAdapterRole",
            value: "7"
          },
          {
            name: "PhysicalDeviceComposite",
            value: "1"
          },
          {
            name: "PhysicalDeviceRole",
            value: "7"
          },
          {
            name: "PhysicalEncryptionRole",
            value: "7"
          },
          {
            name: "PhysicalFirewallRole",
            value: "7"
          },
          {
            name: "PhysicalHolderRole",
            value: "7"
          },
          {
            name: "PhysicalResourceRole",
            value: "6"
          },
          {
            name: "PhysicalRouterRole",
            value: "7"
          },
          {
            name: "PhysicalSwitchRole",
            value: "7"
          }
        ]
      },
      {
        name: "Resource ABE::Resource Order ABE",
        value: "10",
        children: [
          {
            name: "ResourceOrder",
            value: "6"
          },
          {
            name: "ResourceOrderItem",
            value: "3"
          },
          {
            name: "SoftBlackBox",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::Resource Order ABE::Resource Number Portability ABE",
        value: "72",
        children: [
          {
            name: "NumberPortInRequest",
            value: "11"
          },
          {
            name: "NumberPortOutRequest",
            value: "11"
          },
          {
            name: "NumberPortOverRequest",
            value: "11"
          },
          {
            name: "NumberPortabilityPolicyRule",
            value: "15"
          },
          {
            name: "NumberPortabilityRequest",
            value: "11"
          },
          {
            name: "NumberRetirementRequest",
            value: "11"
          },
          {
            name: "PortabilityRequestPolicyRule",
            value: "1"
          },
          {
            name: "ResourceOrderItem",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::Resource Order ABE::Resource Number Portability Role ABE",
        value: "13",
        children: [
          {
            name: "NumberPortabilityClearinghouse",
            value: "5"
          },
          {
            name: "NumberPortabilityRole",
            value: "7"
          },
          {
            name: "PortabilityRequestPolicyRule",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::ResourceRole System View ABE",
        value: "9",
        children: [
          {
            name: "PhysicalHolderRole",
            value: "1"
          },
          {
            name: "ResourceRoleDetails",
            value: "4"
          },
          {
            name: "RolesDescribeCompoundResourceDetails",
            value: "4"
          }
        ]
      },
      {
        name: "Resource ABE::ResourceRole System View ABE::LogicalRole System View ABE",
        value: "5",
        children: [
          {
            name: "RolesDescribeCompoundResourceDetails",
            value: "1"
          },
          {
            name: "RolesDescribeLogicalResourceDetails",
            value: "4"
          }
        ]
      },
      {
        name: "Resource ABE::ResourceRole System View ABE::PhysicalRole System View ABE",
        value: "5",
        children: [
          {
            name: "RolesDescribeLogicalResourceDetails",
            value: "1"
          },
          {
            name: "RolesDescribePhysicalResourceDetails",
            value: "4"
          }
        ]
      },
      {
        name: "Resource ABE::TIP Resource ABE",
        value: "1",
        children: [
          {
            name: "NumberPortabilityClearinghouse",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::TIP Resource ABE::Network Resource Assurance ABE",
        value: "1",
        children: [
          {
            name: "NumberPortabilityClearinghouse",
            value: "1"
          }
        ]
      },
      {
        name: "Resource ABE::TIP Resource ABE::Network Resource Basic ABE",
        value: "6",
        children: [
          {
            name: "CommonResourceInfo",
            value: "5"
          },
          {
            name: "NumberPortabilityClearinghouse",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Configuration ABE",
        value: "12",
        children: [
          {
            name: "CrossedThreshold",
            value: "1"
          },
          {
            name: "ResourceConfigSpec",
            value: "6"
          },
          {
            name: "ResourceConfiguration",
            value: "5"
          }
        ]
      },
      {
        name: "Resource Domain",
        value: "1",
        children: [
          {
            name: "ServiceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Performance ABE",
        value: "3",
        children: [
          {
            name: "CommonResourceInfo",
            value: "1"
          },
          {
            name: "ResourcePerformance",
            value: "2"
          }
        ]
      },
      {
        name: "Resource Performance ABE::Resource Performance Specification ABE",
        value: "6",
        children: [
          {
            name: "ResourcePerformance",
            value: "1"
          },
          {
            name: "ResourcePerformanceSpec",
            value: "5"
          }
        ]
      },
      {
        name: "Resource Specification ABE",
        value: "78",
        children: [
          {
            name: "ResourceRoleSpecification",
            value: "4"
          },
          {
            name: "ResourceSpecCharRelationship",
            value: "4"
          },
          {
            name: "ResourceSpecCharUse",
            value: "10"
          },
          {
            name: "ResourceSpecCharValueRelationship",
            value: "3"
          },
          {
            name: "ResourceSpecCharValueUse",
            value: "3"
          },
          {
            name: "ResourceSpecCharacteristic",
            value: "11"
          },
          {
            name: "ResourceSpecCharacteristicValue",
            value: "9"
          },
          {
            name: "ResourceSpecVersion",
            value: "11"
          },
          {
            name: "ResourceSpecVersionDetails",
            value: "7"
          },
          {
            name: "ResourceSpecification",
            value: "6"
          },
          {
            name: "ResourceSpecificationPerfRole",
            value: "3"
          },
          {
            name: "ResourceSpecificationRelationship",
            value: "3"
          },
          {
            name: "ResourceSpecificationType",
            value: "3"
          },
          {
            name: "ServiceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Specification ABE::CompoundResource Specification ABE",
        value: "13",
        children: [
          {
            name: "CompoundResourceSpec",
            value: "6"
          },
          {
            name: "PhysicalResourceRoleDetails",
            value: "1"
          },
          {
            name: "SoftBlackBoxSpecification",
            value: "6"
          }
        ]
      },
      {
        name: "Resource Specification ABE::LogicalResource Specification ABE",
        value: "30",
        children: [
          {
            name: "ConnectionPointSpec",
            value: "6"
          },
          {
            name: "LogicalResourceSpec",
            value: "6"
          },
          {
            name: "LogicalResourceSpecVersion",
            value: "11"
          },
          {
            name: "ResCatalogResCandidate",
            value: "1"
          },
          {
            name: "ResourceFunctionSpec",
            value: "6"
          }
        ]
      },
      {
        name: "Resource Specification ABE::LogicalResource Specification ABE::Logical Role Specification ABE",
        value: "2",
        children: [
          {
            name: "LogicalDeviceRoleSpec",
            value: "1"
          },
          {
            name: "SoftwareResourceSpecification",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Specification ABE::LogicalResource Specification ABE::LogicalResource Spec Examples ABE",
        value: "44",
        children: [
          {
            name: "ComputeRequirementSpec",
            value: "11"
          },
          {
            name: "ConnectivityRequirementSpec",
            value: "7"
          },
          {
            name: "GameFunctionSpec",
            value: "6"
          },
          {
            name: "LogicalDeviceRoleSpec",
            value: "1"
          },
          {
            name: "NetworkFunctionSpec",
            value: "6"
          },
          {
            name: "OfficeFunctionSpec",
            value: "6"
          },
          {
            name: "StorageRequirementSpec",
            value: "7"
          }
        ]
      },
      {
        name:
          "Resource Specification ABE::LogicalResource Specification ABE::Software Resource and Software Specifications ABE",
        value: "1",
        children: [
          {
            name: "ConnectionPointSpec",
            value: "1"
          }
        ]
      },
      {
        name:
          "Resource Specification ABE::LogicalResource Specification ABE::Software Resource and Software Specifications ABE::Software Resource Specification ABE",
        value: "70",
        children: [
          {
            name: "APISpecification",
            value: "24"
          },
          {
            name: "AtomicSoftwareSpecification",
            value: "1"
          },
          {
            name: "SoftwareResourceSpecRelationship",
            value: "5"
          },
          {
            name: "SoftwareResourceSpecification",
            value: "15"
          },
          {
            name: "SoftwareSpecAlternativeRelationship",
            value: "8"
          },
          {
            name: "SoftwareSpecConstraintRelationship",
            value: "6"
          },
          {
            name: "SoftwareSpecRefinementRelationship",
            value: "5"
          },
          {
            name: "SoftwareSpecRunsOnRelationship",
            value: "6"
          }
        ]
      },
      {
        name:
          "Resource Specification ABE::LogicalResource Specification ABE::Software Resource and Software Specifications ABE::Software Specification ABE",
        value: "68",
        children: [
          {
            name: "AtomicSoftwareSpecification",
            value: "17"
          },
          {
            name: "CompositeSoftwareSpecification",
            value: "17"
          },
          {
            name: "ConnectionPointSpec",
            value: "1"
          },
          {
            name: "HostingPlatformRequirementSpec",
            value: "7"
          },
          {
            name: "ResourceSpecRunsSoftwareSpec",
            value: "3"
          },
          {
            name: "SoftConnectionPointSpec",
            value: "6"
          },
          {
            name: "SoftwareSpecification",
            value: "17"
          }
        ]
      },
      {
        name: "Resource Specification ABE::PhysicalResource Specification ABE",
        value: "30",
        children: [
          {
            name: "ConnectivityRequirementSpec",
            value: "1"
          },
          {
            name: "ElectronicConnectionPointSpec",
            value: "6"
          },
          {
            name: "PhysicalBlackBoxSpec",
            value: "6"
          },
          {
            name: "PhysicalDeviceSpecification",
            value: "6"
          },
          {
            name: "PhysicalResourceSpec",
            value: "6"
          },
          {
            name: "PhysicalResourceSpecAttributes",
            value: "5"
          }
        ]
      },
      {
        name: "Resource Specification ABE::PhysicalResource Specification ABE::Physical Role Specification ABE",
        value: "14",
        children: [
          {
            name: "PhysicalBlackBoxSpec",
            value: "1"
          },
          {
            name: "PhysicalDeviceRoleSpec",
            value: "4"
          },
          {
            name: "PhysicalResourceRoleDetails",
            value: "5"
          },
          {
            name: "PhysicalResourceRoleSpec",
            value: "4"
          }
        ]
      },
      {
        name: "Resource Specification ABE::Resource Catalog ABE",
        value: "23",
        children: [
          {
            name: "ResCatalogResCandidate",
            value: "2"
          },
          {
            name: "ResourceCandidate",
            value: "6"
          },
          {
            name: "ResourceCatalog",
            value: "7"
          },
          {
            name: "ResourceCatalogSpecification",
            value: "7"
          },
          {
            name: "ResourceSpecificationRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Strategy & Plan ABE",
        value: "1",
        children: [
          {
            name: "ResourceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Test ABE",
        value: "8",
        children: [
          {
            name: "ResourceConfiguration",
            value: "1"
          },
          {
            name: "ResourceTest",
            value: "6"
          },
          {
            name: "ResourceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Topology ABE",
        value: "1",
        children: [
          {
            name: "ResourceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Trouble ABE",
        value: "1",
        children: [
          {
            name: "ResourcePerformanceSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Trouble ABE::Alarm ABE",
        value: "37",
        children: [
          {
            name: "AlarmSeverityAssignmentProfile",
            value: "1"
          },
          {
            name: "CrossedThreshold",
            value: "9"
          },
          {
            name: "ResourceAlarm",
            value: "27"
          }
        ]
      },
      {
        name: "Resource Trouble ABE::Alarm Severity Assignment Profile ABE",
        value: "4",
        children: [
          {
            name: "AlarmSeverityAssignmentProfile",
            value: "3"
          },
          {
            name: "ResourcePerformanceSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Resource Usage ABE",
        value: "9",
        children: [
          {
            name: "ResourceUsage",
            value: "3"
          },
          {
            name: "ResourceUsageSpec",
            value: "5"
          },
          {
            name: "SoftBlackBoxSpecification",
            value: "1"
          }
        ]
      },
      {
        name: "Root Business Entities ABE",
        value: "67",
        children: [
          {
            name: "Collection",
            value: "6"
          },
          {
            name: "Entity",
            value: "4"
          },
          {
            name: "EntityRole",
            value: "6"
          },
          {
            name: "EntitySpecification",
            value: "6"
          },
          {
            name: "EntitySpecificationType",
            value: "3"
          },
          {
            name: "EntitySpecificationTypeRelationship",
            value: "2"
          },
          {
            name: "ManagedEntity",
            value: "3"
          },
          {
            name: "ManagementDomain",
            value: "4"
          },
          {
            name: "ManagementInfo",
            value: "7"
          },
          {
            name: "PolicyEventSpecType",
            value: "1"
          },
          {
            name: "Role",
            value: "6"
          },
          {
            name: "RoleSpecification",
            value: "4"
          },
          {
            name: "RootEntity",
            value: "4"
          },
          {
            name: "RootEntityRelationship",
            value: "6"
          },
          {
            name: "RootEntityType",
            value: "5"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::Association ABE",
        value: "17",
        children: [
          {
            name: "Association",
            value: "2"
          },
          {
            name: "AssociationRole",
            value: "2"
          },
          {
            name: "AssociationRoleSpecification",
            value: "6"
          },
          {
            name: "AssociationSpecification",
            value: "6"
          },
          {
            name: "RootEntityGroupChoice",
            value: "1"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::Characteristic ABE",
        value: "72",
        children: [
          {
            name: "CharSpecValueRelationship",
            value: "3"
          },
          {
            name: "CharacteristicSpecRelationship",
            value: "4"
          },
          {
            name: "CharacteristicSpecValue",
            value: "10"
          },
          {
            name: "CharacteristicSpecification",
            value: "11"
          },
          {
            name: "CharacteristicValue",
            value: "3"
          },
          {
            name: "EntitySpecCharUse",
            value: "10"
          },
          {
            name: "EntitySpecCharUseRelationship",
            value: "4"
          },
          {
            name: "EntitySpecCharValueUse",
            value: "3"
          },
          {
            name: "EntitySpecCharValueUseRelationship",
            value: "3"
          },
          {
            name: "RootEntityTypeCharUse",
            value: "10"
          },
          {
            name: "RootEntityTypeCharUseRelationship",
            value: "4"
          },
          {
            name: "RootEntityTypeCharValueUse",
            value: "3"
          },
          {
            name: "RootEntityTypeCharValueUseRelationship",
            value: "3"
          },
          {
            name: "RootEntityTypeIdentificationSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::Characteristic ABE::Characteristic Pricing ABE",
        value: "8",
        children: [
          {
            name: "CharPriceDepMember",
            value: "4"
          },
          {
            name: "CharacteristicPriceDependency",
            value: "3"
          },
          {
            name: "EntitySpecCharValueUseRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::Entity Identification ABE",
        value: "29",
        children: [
          {
            name: "ComponentEntityIdentification",
            value: "2"
          },
          {
            name: "ComponentEntityIdentificationSpec",
            value: "8"
          },
          {
            name: "CompositeEntityIdentification",
            value: "2"
          },
          {
            name: "CompositeEntityIdentificationSpec",
            value: "4"
          },
          {
            name: "EntityIdentification",
            value: "2"
          },
          {
            name: "EntityIdentificationSpecFormat",
            value: "4"
          },
          {
            name: "EntityIdentificationSpecification",
            value: "4"
          },
          {
            name: "RootEntityRelationship",
            value: "1"
          },
          {
            name: "RootEntityTypeIdentificationSpec",
            value: "2"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::Entity Specification Action ABE",
        value: "13",
        children: [
          {
            name: "AssuranceCapabilitySpecification",
            value: "1"
          },
          {
            name: "EntitySpecificationAction",
            value: "6"
          },
          {
            name: "EntitySpecificationActionWorkflow",
            value: "6"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::Entity Specification Attachment ABE",
        value: "7",
        children: [
          {
            name: "CharPriceDepMember",
            value: "1"
          },
          {
            name: "EntitySpecificationAttachment",
            value: "6"
          }
        ]
      },
      {
        name:
          "Root Business Entities ABE::Entity Specification Attachment ABE::Entity Specification Attachment Example Instances ABE",
        value: "15",
        children: [
          {
            name: "EntitySpecificationAttachment",
            value: "1"
          },
          {
            name: "EntitySpecificationDocumentation",
            value: "7"
          },
          {
            name: "EntitySpecificationImage",
            value: "7"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::External System Capability ABE",
        value: "75",
        children: [
          {
            name: "AssuranceCapabilitySpecification",
            value: "12"
          },
          {
            name: "BillingCapabilitySpecification",
            value: "13"
          },
          {
            name: "ChargingCapabilitySpecification",
            value: "12"
          },
          {
            name: "EntitySpecificationDocumentation",
            value: "1"
          },
          {
            name: "ExternalSystemCapability",
            value: "10"
          },
          {
            name: "FulfilmentCapabilitySpecification",
            value: "13"
          },
          {
            name: "PolicyCapabilitySpecification",
            value: "14"
          }
        ]
      },
      {
        name: "Root Business Entities ABE::Root Entity Group ABE",
        value: "26",
        children: [
          {
            name: "EntitySpecificationActionWorkflow",
            value: "1"
          },
          {
            name: "RootEntityGroup",
            value: "3"
          },
          {
            name: "RootEntityGroupChoice",
            value: "6"
          },
          {
            name: "RootEntityGroupMember",
            value: "2"
          },
          {
            name: "RootEntityGroupMemberExpression",
            value: "8"
          },
          {
            name: "RootEntityGroupRelationship",
            value: "6"
          }
        ]
      },
      {
        name: "Sales Channel ABE",
        value: "2",
        children: [
          {
            name: "MarketStrategy",
            value: "1"
          },
          {
            name: "SalesChannel",
            value: "1"
          }
        ]
      },
      {
        name: "Sales Statistics ABE",
        value: "1",
        children: [
          {
            name: "CompetitorProductCorrelation",
            value: "1"
          }
        ]
      },
      {
        name: "Service ABE",
        value: "46",
        children: [
          {
            name: "AdministerServiceDetails",
            value: "4"
          },
          {
            name: "OwnsServiceDetails",
            value: "4"
          },
          {
            name: "Service",
            value: "9"
          },
          {
            name: "ServiceCharacteristicValue",
            value: "3"
          },
          {
            name: "ServiceInvolvementRole",
            value: "3"
          },
          {
            name: "ServiceLRDependency",
            value: "4"
          },
          {
            name: "ServicePRDependency",
            value: "4"
          },
          {
            name: "ServicePlaceDetails",
            value: "5"
          },
          {
            name: "ServiceProblem",
            value: "1"
          },
          {
            name: "ServiceRelationship",
            value: "3"
          },
          {
            name: "ServiceRole",
            value: "6"
          }
        ]
      },
      {
        name: "Service ABE::Customer Facing Service ABE",
        value: "41",
        children: [
          {
            name: "CustomerFacingService",
            value: "10"
          },
          {
            name: "CustomerFacingServiceAtomic",
            value: "10"
          },
          {
            name: "CustomerFacingServiceComposite",
            value: "10"
          },
          {
            name: "ServicePackage",
            value: "10"
          },
          {
            name: "ServiceRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Service ABE::Customer Facing Service ABE::Customer Facing Service Example ABE",
        value: "11",
        children: [
          {
            name: "CustomerFacingServiceRole",
            value: "1"
          },
          {
            name: "IPsecVPNService",
            value: "10"
          }
        ]
      },
      {
        name: "Service ABE::Customer Facing Service ABE::CustomerFacing Service Role ABE",
        value: "7",
        children: [
          {
            name: "CustomerFacingServiceRole",
            value: "6"
          },
          {
            name: "ServicePackage",
            value: "1"
          }
        ]
      },
      {
        name: "Service ABE::Resource Facing Service ABE",
        value: "45",
        children: [
          {
            name: "IPsecVPNService",
            value: "1"
          },
          {
            name: "ProtocolServiceDetails",
            value: "3"
          },
          {
            name: "ResourceFacingService",
            value: "10"
          },
          {
            name: "ResourceFacingServiceAtomic",
            value: "10"
          },
          {
            name: "ResourceFacingServiceComposite",
            value: "10"
          },
          {
            name: "ServiceBundle",
            value: "11"
          }
        ]
      },
      {
        name: "Service ABE::Resource Facing Service ABE::Resource Facing Service Examples ABE",
        value: "55",
        children: [
          {
            name: "BandwidthService",
            value: "10"
          },
          {
            name: "CoS1Bundle",
            value: "11"
          },
          {
            name: "CoS2Bundle",
            value: "11"
          },
          {
            name: "CoS3Bundle",
            value: "11"
          },
          {
            name: "CoS4Bundle",
            value: "11"
          },
          {
            name: "ResourceFacingServiceRole",
            value: "1"
          }
        ]
      },
      {
        name: "Service ABE::Resource Facing Service ABE::Resource Facing Service Role ABE",
        value: "19",
        children: [
          {
            name: "ResourceFacingServiceRole",
            value: "6"
          },
          {
            name: "ServiceBundle",
            value: "1"
          },
          {
            name: "VPNSecurityServiceRole",
            value: "6"
          },
          {
            name: "VPNTopologyServiceRole",
            value: "6"
          }
        ]
      },
      {
        name: "Service ABE::Service Order ABE",
        value: "10",
        children: [
          {
            name: "CoS4Bundle",
            value: "1"
          },
          {
            name: "ServiceOrder",
            value: "6"
          },
          {
            name: "ServiceOrderItem",
            value: "3"
          }
        ]
      },
      {
        name: "Service Configuration ABE",
        value: "12",
        children: [
          {
            name: "CommonServiceInfo",
            value: "1"
          },
          {
            name: "ServiceConfigSpec",
            value: "6"
          },
          {
            name: "ServiceConfiguration",
            value: "5"
          }
        ]
      },
      {
        name: "Service Performance ABE",
        value: "3",
        children: [
          {
            name: "ServicePerformance",
            value: "2"
          },
          {
            name: "ServiceUsageSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Service Performance ABE::Service Level Spec ABE",
        value: "42",
        children: [
          {
            name: "KeyPerformanceIndicatorSLSParm",
            value: "4"
          },
          {
            name: "KeyQualityIndicatorSLSParm",
            value: "5"
          },
          {
            name: "NegotiatedServiceLevelSpec",
            value: "2"
          },
          {
            name: "ServiceLevelObjective",
            value: "9"
          },
          {
            name: "ServiceLevelSpecApplicability",
            value: "4"
          },
          {
            name: "ServiceLevelSpecConsequence",
            value: "3"
          },
          {
            name: "ServiceLevelSpecExpression",
            value: "6"
          },
          {
            name: "ServiceLevelSpecParameter",
            value: "4"
          },
          {
            name: "ServiceLevelSpecification",
            value: "2"
          },
          {
            name: "ServicePerformanceSpec",
            value: "1"
          },
          {
            name: "TemplateServiceLevelSpec",
            value: "2"
          }
        ]
      },
      {
        name: "Service Performance ABE::Service Performance Specification ABE",
        value: "6",
        children: [
          {
            name: "ServicePerformance",
            value: "1"
          },
          {
            name: "ServicePerformanceSpec",
            value: "5"
          }
        ]
      },
      {
        name: "Service Problem ABE",
        value: "18",
        children: [
          {
            name: "ServiceProblem",
            value: "18"
          }
        ]
      },
      {
        name: "Service Specification ABE",
        value: "67",
        children: [
          {
            name: "ServiceOrderItem",
            value: "1"
          },
          {
            name: "ServiceSpecCharRelationship",
            value: "4"
          },
          {
            name: "ServiceSpecCharUse",
            value: "11"
          },
          {
            name: "ServiceSpecCharValueRelationship",
            value: "1"
          },
          {
            name: "ServiceSpecCharValueUse",
            value: "3"
          },
          {
            name: "ServiceSpecCharacteristic",
            value: "11"
          },
          {
            name: "ServiceSpecCharacteristicValue",
            value: "9"
          },
          {
            name: "ServiceSpecRelationship",
            value: "3"
          },
          {
            name: "ServiceSpecVersion",
            value: "11"
          },
          {
            name: "ServiceSpecification",
            value: "6"
          },
          {
            name: "ServiceSpecificationRole",
            value: "4"
          },
          {
            name: "ServiceSpecificationType",
            value: "3"
          }
        ]
      },
      {
        name: "Service Specification ABE::Customer Facing Service Spec ABE",
        value: "37",
        children: [
          {
            name: "CFSSpecVersionDetails",
            value: "7"
          },
          {
            name: "CustomerFacingServiceSpec",
            value: "6"
          },
          {
            name: "CustomerFacingServiceSpecAtomic",
            value: "6"
          },
          {
            name: "CustomerFacingServiceSpecComposite",
            value: "6"
          },
          {
            name: "CustomerFacingServiceSpecVersion",
            value: "11"
          },
          {
            name: "ServiceSpecRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Service Specification ABE::Customer Facing Service Spec ABE::Customer Facing Service Spec Examples ABE",
        value: "13",
        children: [
          {
            name: "IPsecVPNServiceSpecification",
            value: "6"
          },
          {
            name: "SilverPackageSpec",
            value: "1"
          },
          {
            name: "VPNServiceSpecification",
            value: "6"
          }
        ]
      },
      {
        name: "Service Specification ABE::Customer Facing Service Spec ABE::Customer Facing Service Spec Role ABE",
        value: "5",
        children: [
          {
            name: "CFSSpecVersionDetails",
            value: "1"
          },
          {
            name: "CustomerFacingServiceSpecRole",
            value: "4"
          }
        ]
      },
      {
        name: "Service Specification ABE::Customer Facing Service Spec ABE::Service Package ABE",
        value: "22",
        children: [
          {
            name: "CustomerFacingServiceSpecRole",
            value: "1"
          },
          {
            name: "ServicePackageSpec",
            value: "7"
          },
          {
            name: "ServicePackageSpecAtomic",
            value: "7"
          },
          {
            name: "ServicePackageSpecComposite",
            value: "7"
          }
        ]
      },
      {
        name:
          "Service Specification ABE::Customer Facing Service Spec ABE::Service Package ABE::Service Package Spec Examples ABE",
        value: "36",
        children: [
          {
            name: "BestEffortPackageSpec",
            value: "7"
          },
          {
            name: "BronzePackageSpec",
            value: "7"
          },
          {
            name: "GoldPackageSpec",
            value: "7"
          },
          {
            name: "PlatinumPackageSpec",
            value: "7"
          },
          {
            name: "ServicePackageSpecComposite",
            value: "1"
          },
          {
            name: "SilverPackageSpec",
            value: "7"
          }
        ]
      },
      {
        name: "Service Specification ABE::Resource Facing Service Spec ABE",
        value: "37",
        children: [
          {
            name: "IPsecVPNServiceSpecification",
            value: "1"
          },
          {
            name: "RFSSpecVersionDetails",
            value: "7"
          },
          {
            name: "ResourceFacingServiceSpec",
            value: "6"
          },
          {
            name: "ResourceFacingServiceSpecAtomic",
            value: "6"
          },
          {
            name: "ResourceFacingServiceSpecComposite",
            value: "6"
          },
          {
            name: "ResourceFacingServiceSpecVersion",
            value: "11"
          }
        ]
      },
      {
        name: "Service Specification ABE::Resource Facing Service Spec ABE::Resource Facing Service Spec Role ABE",
        value: "5",
        children: [
          {
            name: "RFSSpecVersionDetails",
            value: "1"
          },
          {
            name: "ResourceFacingServiceSpecRole",
            value: "4"
          }
        ]
      },
      {
        name: "Service Specification ABE::Resource Facing Service Spec ABE::Service Bundle ABE",
        value: "28",
        children: [
          {
            name: "ResourceFacingServiceSpecRole",
            value: "1"
          },
          {
            name: "ServiceBundleSpec",
            value: "7"
          },
          {
            name: "ServiceBundleSpecAtomic",
            value: "7"
          },
          {
            name: "ServiceBundleSpecComposite",
            value: "7"
          },
          {
            name: "ServicePackageBundleDetails",
            value: "6"
          }
        ]
      },
      {
        name:
          "Service Specification ABE::Resource Facing Service Spec ABE::Service Bundle ABE::Service Bundle Examples ABE",
        value: "29",
        children: [
          {
            name: "CoS1BundleSpec",
            value: "7"
          },
          {
            name: "CoS2BundleSpec",
            value: "7"
          },
          {
            name: "CoS3BundleSpec",
            value: "7"
          },
          {
            name: "CoS4BundleSpec",
            value: "7"
          },
          {
            name: "ServicePackageBundleDetails",
            value: "1"
          }
        ]
      },
      {
        name: "Service Specification ABE::Service Catalog ABE",
        value: "23",
        children: [
          {
            name: "CoS4BundleSpec",
            value: "1"
          },
          {
            name: "ServCatalogServCandidate",
            value: "2"
          },
          {
            name: "ServiceCandidate",
            value: "6"
          },
          {
            name: "ServiceCatalog",
            value: "7"
          },
          {
            name: "ServiceCatalogSpecification",
            value: "7"
          }
        ]
      },
      {
        name: "Service Strategy & Plan ABE",
        value: "1",
        children: [
          {
            name: "ServiceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Service Test ABE",
        value: "8",
        children: [
          {
            name: "ServiceConfiguration",
            value: "1"
          },
          {
            name: "ServiceTest",
            value: "6"
          },
          {
            name: "ServiceTestSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Service Usage ABE",
        value: "9",
        children: [
          {
            name: "ServCatalogServCandidate",
            value: "1"
          },
          {
            name: "ServiceUsage",
            value: "3"
          },
          {
            name: "ServiceUsageSpec",
            value: "5"
          }
        ]
      },
      {
        name: "Strategic Product Portfolio Plan ABE",
        value: "2",
        children: [
          {
            name: "ProductOfferingStrategy",
            value: "1"
          },
          {
            name: "ProductPricePartyRole",
            value: "1"
          }
        ]
      },
      {
        name: "TIP Common ABE",
        value: "1",
        children: [
          {
            name: "Resource1",
            value: "1"
          }
        ]
      },
      {
        name: "TIP Common ABE::Framework ABE",
        value: "11",
        children: [
          {
            name: "CommonObjectInfo",
            value: "9"
          },
          {
            name: "Resource1",
            value: "1"
          },
          {
            name: "TIPManagementDomain",
            value: "1"
          }
        ]
      },
      {
        name: "TIP Common ABE::Framework ABE::TIP Internal Model - Illustrative only",
        value: "5",
        children: [
          {
            name: "CommonObjectInfo",
            value: "1"
          },
          {
            name: "EntityBase",
            value: "4"
          }
        ]
      },
      {
        name: "TIP Common ABE::Management Job ABE",
        value: "17",
        children: [
          {
            name: "EntityBase",
            value: "1"
          },
          {
            name: "FileTransferData",
            value: "7"
          },
          {
            name: "ManagementJob",
            value: "7"
          },
          {
            name: "ProtocolTransferData",
            value: "2"
          }
        ]
      },
      {
        name: "TIP Service Management ABE",
        value: "26",
        children: [
          {
            name: "CommonServiceInfo",
            value: "10"
          },
          {
            name: "SapSpecification",
            value: "3"
          },
          {
            name: "ServiceAccessPoint",
            value: "5"
          },
          {
            name: "ServiceDefinition",
            value: "3"
          },
          {
            name: "ServiceTemplate",
            value: "4"
          },
          {
            name: "TemplateServiceLevelSpec",
            value: "1"
          }
        ]
      },
      {
        name: "Test ABE",
        value: "22",
        children: [
          {
            name: "MetricMeasurementProductionJob",
            value: "1"
          },
          {
            name: "Test",
            value: "6"
          },
          {
            name: "TestMeasure",
            value: "2"
          },
          {
            name: "TestMeasureDefinition",
            value: "8"
          },
          {
            name: "TestSpecification",
            value: "4"
          },
          {
            name: "TestSpecificationRole",
            value: "1"
          }
        ]
      },
      {
        name: "Topology ABE",
        value: "6",
        children: [
          {
            name: "AdjacencyGraph",
            value: "1"
          },
          {
            name: "ConnectivityGraph",
            value: "1"
          },
          {
            name: "DirectedEdge",
            value: "1"
          },
          {
            name: "Graph",
            value: "1"
          },
          {
            name: "TestMeasure",
            value: "1"
          },
          {
            name: "Vertex",
            value: "1"
          }
        ]
      },
      {
        name: "Trouble Ticket ABE",
        value: "14",
        children: [
          {
            name: "TroubleTicket",
            value: "10"
          },
          {
            name: "TroubleTicketItem",
            value: "3"
          },
          {
            name: "UsageSpecCharRelationship",
            value: "1"
          }
        ]
      },
      {
        name: "Trouble or Problem ABE",
        value: "29",
        children: [
          {
            name: "CatalogRelationship",
            value: "1"
          },
          {
            name: "Comment",
            value: "5"
          },
          {
            name: "Problem",
            value: "18"
          },
          {
            name: "TrackingRecord",
            value: "5"
          }
        ]
      },
      {
        name: "Usage ABE",
        value: "15",
        children: [
          {
            name: "CharacteristicArray",
            value: "1"
          },
          {
            name: "ContextUsage",
            value: "4"
          },
          {
            name: "FixedScheduleItem",
            value: "1"
          },
          {
            name: "Usage",
            value: "3"
          },
          {
            name: "UsageCharacteristicValue",
            value: "3"
          },
          {
            name: "UsageRelationship",
            value: "3"
          }
        ]
      },
      {
        name: "Usage ABE::IP Detail Record ABE",
        value: "59",
        children: [
          {
            name: "ContextUsage",
            value: "1"
          },
          {
            name: "DOCSISType",
            value: "1"
          },
          {
            name: "FieldDescriptor",
            value: "5"
          },
          {
            name: "IPDR",
            value: "1"
          },
          {
            name: "IPDRCreationTime",
            value: "2"
          },
          {
            name: "IPDRDoc",
            value: "5"
          },
          {
            name: "IPDRDocEnd",
            value: "3"
          },
          {
            name: "IPDREmailType",
            value: "1"
          },
          {
            name: "IPDRSPData",
            value: "7"
          },
          {
            name: "IPDRStreamingMediaType",
            value: "1"
          },
          {
            name: "IPDRType",
            value: "1"
          },
          {
            name: "IPDRVoiPType",
            value: "1"
          },
          {
            name: "IPDRWholeSaleType",
            value: "1"
          },
          {
            name: "IPDetailRecord",
            value: "6"
          },
          {
            name: "PublicWANAccessUsageEntity",
            value: "16"
          },
          {
            name: "PublicWLANAccessUsageEntry",
            value: "1"
          },
          {
            name: "TemplateBlock",
            value: "4"
          },
          {
            name: "seqNum",
            value: "2"
          }
        ]
      },
      {
        name: "Usage ABE::Usage Example Instances ABE",
        value: "9",
        children: [
          {
            name: "PublicWANAccessUsageEntity",
            value: "1"
          },
          {
            name: "VoiceCallUsage",
            value: "8"
          }
        ]
      },
      {
        name: "Usage ABE::Usage Spec ABE",
        value: "55",
        children: [
          {
            name: "UsageCharacteristicCategory",
            value: "3"
          },
          {
            name: "UsageSpecCharRelationship",
            value: "4"
          },
          {
            name: "UsageSpecCharUse",
            value: "10"
          },
          {
            name: "UsageSpecCharValueRelationship",
            value: "3"
          },
          {
            name: "UsageSpecCharValueUse",
            value: "3"
          },
          {
            name: "UsageSpecCharacteristic",
            value: "11"
          },
          {
            name: "UsageSpecCharacteristicValue",
            value: "9"
          },
          {
            name: "UsageSpecVersion",
            value: "6"
          },
          {
            name: "UsageSpecification",
            value: "5"
          },
          {
            name: "VoiceCallUsage",
            value: "1"
          }
        ]
      },
      {
        name: "Users and Roles ABE",
        value: "8",
        children: [
          {
            name: "CapacityDemandRelationship",
            value: "1"
          },
          {
            name: "InvolvementIdentification",
            value: "1"
          },
          {
            name: "InvolvementIdentifictionRole",
            value: "1"
          },
          {
            name: "InvolvementRole",
            value: "3"
          },
          {
            name: "PartyUser",
            value: "1"
          },
          {
            name: "ResourceUser",
            value: "1"
          }
        ]
      },
      {
        name: "Workforce ABE",
        value: "1",
        children: [
          {
            name: "CompositeBusinessObjective",
            value: "1"
          }
        ]
      },
      {
        name: "Workforce ABE::WorkSpecification ABE",
        value: "24",
        children: [
          {
            name: "WorkRole",
            value: "1"
          },
          {
            name: "WorkSpecFulfillmentRate",
            value: "4"
          },
          {
            name: "WorkSpecRelationship",
            value: "3"
          },
          {
            name: "WorkSpecification",
            value: "5"
          },
          {
            name: "WorkSpecificationCost",
            value: "2"
          },
          {
            name: "WorkSpecificationRole",
            value: "2"
          },
          {
            name: "WorkSpecificationType",
            value: "2"
          },
          {
            name: "WorkSpecificationVersion",
            value: "5"
          }
        ]
      },
      {
        name: "Workforce ABE::Workforce Resource ABE",
        value: "40",
        children: [
          {
            name: "WorkSchedule",
            value: "1"
          },
          {
            name: "WorkforceEmployeePool",
            value: "2"
          },
          {
            name: "WorkforceEmployeePoolAssignment",
            value: "3"
          },
          {
            name: "WorkforceEmployeeRole",
            value: "6"
          },
          {
            name: "WorkforceOrganizationRole",
            value: "6"
          },
          {
            name: "WorkforcePoolAssignment",
            value: "3"
          },
          {
            name: "WorkforceResourcePool",
            value: "2"
          },
          {
            name: "WorkforceResourcePoolAssignment",
            value: "3"
          },
          {
            name: "WorkforceResourceRole",
            value: "7"
          },
          {
            name: "WorkforceResourceTool",
            value: "7"
          }
        ]
      },
      {
        name: "Workforce ABE::Workforce Resource ABE::Work ABE",
        value: "5",
        children: [
          {
            name: "Work",
            value: "2"
          },
          {
            name: "WorkRole",
            value: "2"
          },
          {
            name: "WorkforceResourceRole",
            value: "1"
          }
        ]
      },
      {
        name: "Workforce ABE::Workforce Schedule ABE",
        value: "14",
        children: [
          {
            name: "CompositeBusinessObjective",
            value: "1"
          },
          {
            name: "WorkSchedule",
            value: "5"
          },
          {
            name: "WorkforceEmployeeAssignment",
            value: "2"
          },
          {
            name: "WorkforceEmployeeReservation",
            value: "2"
          },
          {
            name: "WorkforceResourceAssignment",
            value: "2"
          },
          {
            name: "WorkforceResourceReservation",
            value: "2"
          }
        ]
      }
    ]
  }

  test("Renders the chart", () => {
    viz.data(data)
    viz.config({ suppressAnimation: true })
    viz.draw()
  })
}

export const title = "Simple rendering / large dataset"
