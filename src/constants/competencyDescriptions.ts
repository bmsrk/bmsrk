export const COMPETENCY_DESCRIPTION_MAP: Record<string, string> = {
  // Core Competencies / Achievements
  'Microsoft Dynamics 365':
    'Comprehensive expertise in the Dynamics 365 suite including Sales, Customer Service, Field Service, and Customer Insights. Deep knowledge of configuration, customization, and integration patterns.',
  'Power Platform':
    'Advanced skills in Power Apps (Canvas & Model-Driven), Power Automate, Power BI, and Power Pages. Expert in low-code/no-code solutions and custom component development.',
  'Azure Cloud Services':
    'Proficient in Azure services including Logic Apps, Functions, Service Bus, API Management, DevOps, and App Services. Experience designing cloud-native and hybrid solutions.',
  'End-to-End CRM Implementation':
    'Expertise in managing complete CRM project lifecycles, from requirements gathering and solution design through development, testing, deployment, and user adoption.',
  'Enterprise Architecture Design':
    'Skills in designing scalable, secure, and maintainable enterprise solutions that align with business objectives and technical best practices.',
  'Integration Solutions':
    'Proven track record in integrating Dynamics 365 with various systems including SAP, legacy applications, and third-party services using REST APIs, OData, and middleware.',
  'Custom Development':
    'Advanced development capabilities in C#, .NET, JavaScript, TypeScript, and React. Experience building plugins, custom workflows, PCF components, and web resources.',
  'Technical Leadership':
    'Leading development teams, mentoring junior developers, conducting code reviews, and establishing best practices and architectural standards.',
  'Solution Architecture':
    'Designing comprehensive solutions that balance business requirements, technical constraints, performance, security, and maintainability.',
  'Client Engagement':
    'Strong stakeholder management, requirements gathering through workshops, solution presentations, and maintaining client relationships throughout project delivery.',
  'Agile & DevOps':
    'Implementing agile methodologies (Scrum), CI/CD pipelines, automated testing, and DevOps practices for efficient solution delivery.',
  'Data Migration':
    'Planning and executing complex data migration strategies using SSIS, Azure Data Factory, and custom migration tools with data validation and cleansing.',
  'Performance Optimization':
    'Identifying and resolving performance bottlenecks, optimizing queries, implementing caching strategies, and improving user experience.',
  'Security Implementation':
    'Implementing role-based security, field-level security, hierarchical security, and ensuring compliance with data protection regulations.',
  'Training & Documentation':
    'Creating comprehensive technical documentation, user guides, training materials, and conducting end-user and administrator training sessions.',
};

export const getCompetencyDescription = (title: string): string => {
  return (
    COMPETENCY_DESCRIPTION_MAP[title] ||
    `Specialized expertise in ${title}, contributing to successful project delivery and business transformation.`
  );
};
