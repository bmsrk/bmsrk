import { ResumeData } from '../types/types';

export const SKILL_URL_MAP: Record<string, string> = {
  // Dynamics & Power Platform
  "Dynamics 365 Customer Engagement": "https://learn.microsoft.com/en-us/dynamics365/customer-engagement/guidance/server/introduction",
  "Dynamics 365 Sales": "https://learn.microsoft.com/en-us/dynamics365/sales/",
  "Dynamics 365 Customer Service": "https://learn.microsoft.com/en-us/dynamics365/customer-service/",
  "Dynamics 365 Field Service": "https://learn.microsoft.com/en-us/dynamics365/field-service/",
  "Dynamics 365 Customer Insights": "https://learn.microsoft.com/en-us/dynamics365/customer-insights/",
  "Microsoft Dataverse": "https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-intro",
  "Model-Driven Apps": "https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/model-driven-app-overview",
  "Power Apps": "https://learn.microsoft.com/en-us/power-apps/powerapps-overview",
  "Power Automate": "https://learn.microsoft.com/en-us/power-automate/getting-started-cloud-flow",
  "Power BI": "https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview",
  "Power Apps Portals": "https://learn.microsoft.com/en-us/power-pages/introduction",
  "Custom Connectors": "https://learn.microsoft.com/en-us/connectors/custom-connectors/",
  "PCF Components": "https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview",
  "Canvas Apps": "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/getting-started",
  
  // Azure
  "Azure Logic Apps": "https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-overview",
  "Azure Functions": "https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview",
  "Azure Service Bus": "https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview",
  "Azure API Management": "https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts",
  "Azure DevOps": "https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops",
  "Azure App Services": "https://learn.microsoft.com/en-us/azure/app-service/overview",
  "Azure Blob Storage": "https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction",
  
  // Development
  "C#": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/",
  ".NET Framework": "https://learn.microsoft.com/en-us/dotnet/framework/get-started/",
  ".NET Core": "https://learn.microsoft.com/en-us/dotnet/core/introduction",
  "JavaScript": "https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/javascript/",
  "TypeScript": "https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-typescript/",
  "React": "https://learn.microsoft.com/en-us/training/paths/react/",
  "SQL Server": "https://learn.microsoft.com/en-us/sql/sql-server/sql-server-technical-documentation",
  "T-SQL": "https://learn.microsoft.com/en-us/sql/t-sql/language-reference",
  "Web API": "https://learn.microsoft.com/en-us/aspnet/core/web-api/",
  "REST API": "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design",
  "Plugin Development": "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/plug-ins",
  
  // Methodologies / Misc
  "Agile": "https://learn.microsoft.com/en-us/devops/plan/what-is-agile",
  "Scrum": "https://learn.microsoft.com/en-us/devops/plan/what-is-scrum",
  "DevOps": "https://learn.microsoft.com/en-us/devops/what-is-devops",
  "CI/CD": "https://learn.microsoft.com/en-us/devops/deliver/what-is-cicd",
  "Solution Architecture": "https://learn.microsoft.com/en-us/azure/architecture/"
};

export const SKILL_DESCRIPTION_MAP: Record<string, string> = {
  // CRM
  "Dynamics 365 Customer Engagement": "Suite of intelligent business applications for CRM and relationship management.",
  "Dynamics 365 Sales": "Sales force automation to manage relationships and close deals faster.",
  "Dynamics 365 Customer Service": "Support solutions to drive customer satisfaction and loyalty.",
  "Dynamics 365 Field Service": "End-to-end management for on-site service operations and scheduling.",
  "Dynamics 365 Customer Insights": "Unified customer data platform (CDP) and journey orchestration.",
  "Microsoft Dataverse": "Secure, scalable data platform for Power Platform and Dynamics 365.",
  "Model-Driven Apps": "Component-focused apps design offering rich business logic and data modeling.",
  
  // Power Platform
  "Power Apps": "Suite for building custom low-code/no-code business applications.",
  "Power Automate": "Service to automate workflows between apps and services.",
  "Power BI": "Business analytics service for interactive visualizations and BI.",
  "Power Apps Portals": "External-facing websites for users outside the organization.",
  "Custom Connectors": "Wrappers around APIs to communicate with Logic Apps and Power Automate.",
  "PCF Components": "Power Apps Component Framework for creating custom UI controls.",
  "Canvas Apps": "UI-focused apps with pixel-perfect control over the layout.",
  
  // Azure
  "Azure Logic Apps": "Cloud service to schedule, automate, and orchestrate tasks and workflows.",
  "Azure Functions": "Serverless compute service to run event-triggered code without infrastructure.",
  "Azure Service Bus": "Enterprise message broker for decoupling applications and services.",
  "Azure API Management": "Platform to create, publish, maintain, monitor, and secure APIs.",
  "Azure DevOps": "Services for teams to share code, track work, and ship software.",
  "Azure App Services": "HTTP-based service for hosting web applications, REST APIs, and mobile back ends.",
  "Azure Blob Storage": "Massively scalable object storage for unstructured data.",
  
  // Dev
  "C#": "Modern, object-oriented, type-safe programming language for .NET.",
  ".NET Framework": "Development framework for building apps on Windows.",
  ".NET Core": "Cross-platform, high-performance framework for modern cloud-enabled apps.",
  "JavaScript": "High-level, interpreted scripting language for web pages.",
  "TypeScript": "Superset of JavaScript adding static type definitions.",
  "React": "JavaScript library for building user interfaces.",
  "HTML": "Standard markup language for documents designed to be displayed in a web browser.",
  "CSS": "Style sheet language used for describing the presentation of a document.",
  "SQL Server": "Relational database management system developed by Microsoft.",
  "T-SQL": "Proprietary extension to SQL for SQL Server interaction.",
  "Web API": "Framework for building HTTP services that reach a broad range of clients.",
  "REST API": "Architectural style for designing networked applications.",
  "Plugin Development": "Custom business logic execution within the Dynamics 365 event pipeline.",
  
  // Integration
  "API Integration": "Connecting systems via Application Programming Interfaces.",
  "Middleware Development": "Software connecting different applications or services.",
  "ETL Processes": "Extract, Transform, Load data integration processes.",
  "Real-time Data Synchronization": "Immediate data consistency across multiple systems.",
  "Legacy System Integration": "Connecting modern apps with older, established systems.",
  "SAP Integration": "Connecting Microsoft ecosystem with SAP ERP modules.",
  "ERP Integration": "Synchronizing data between CRM and Enterprise Resource Planning systems.",

  // Methodologies
  "Agile": "Iterative approach to project management and software development.",
  "Scrum": "Framework for developing, delivering, and sustaining complex products.",
  "DevOps": "Practices combining software development and IT operations.",
  "CI/CD": "Continuous Integration and Continuous Delivery/Deployment.",
  "Test-Driven Development": "Software development process relying on software requirements being converted to test cases.",
  "Code Reviews": "Systematic examination of computer source code.",
  "Solution Architecture": "Designing and managing complex solution engineering.",
  "Enterprise Architecture": "Organizing logic for business processes and IT infrastructure.",

  // Leadership
  "Technical Team Leadership": "Guiding technical teams towards successful delivery.",
  "Client Workshops": "Collaborative sessions to define requirements and solutions.",
  "Stakeholder Management": "Maintaining relationships with project investors and users.",
  "Solution Design": "Defining the architecture and components of a solution.",
  "Mentoring": "Guiding less experienced developers.",
  "Training": "Educating users or team members.",
  "Project Rescue": "Recovering failing projects through technical intervention."
};

export const getSkillUrl = (skill: string) => {
  if (SKILL_URL_MAP[skill]) return SKILL_URL_MAP[skill];
  return `https://learn.microsoft.com/en-us/search/?terms=${encodeURIComponent(skill)}`;
};

export const getSkillDescription = (skill: string) => {
  return SKILL_DESCRIPTION_MAP[skill] || `Documentation and resources for ${skill}`;
};