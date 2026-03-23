export type Subject = {
  code: string;
  name: string;
  hours: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  isElective?: boolean;
};

export type SemesterData = {
  [semKey: string]: Subject[];
};

export type BranchData = {
  [branch: string]: SemesterData;
};

export type MSBTEData = {
  diploma: BranchData;
  btech: BranchData;
};

export const MSBTE_DATA: MSBTEData = {
  diploma: {
    "Computer Engineering": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Foundation mathematics covering algebra, trigonometry, and calculus basics" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Physics and chemistry fundamentals for engineering" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "Professional English communication and writing skills" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Technical drawing, orthographic projection, and CAD basics" },
        { code: "311002", name: "Engineering Workshop Practice", hours: 32, difficulty: "Medium", description: "Hands-on workshop tools and fabrication techniques" },
        { code: "311001", name: "Fundamentals of ICT", hours: 32, difficulty: "Easy", description: "Computer basics, internet, MS Office and ICT concepts" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Physical and mental wellness through yoga practices" },
      ],
      sem2: [
        { code: "312001", name: "Linux Basics", hours: 32, difficulty: "Medium", description: "Linux OS fundamentals, shell commands and file management" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Workplace communication, presentations and report writing" },
        { code: "312003", name: "Social and Life Skills", hours: 16, difficulty: "Easy", description: "Interpersonal skills, teamwork and life management" },
        { code: "312004", name: "Web Page Designing", hours: 48, difficulty: "Medium", description: "HTML5, CSS3, and responsive web design fundamentals" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Matrices, integral calculus, differential equations" },
        { code: "312302", name: "Basic Electrical and Electronics Engineering", hours: 48, difficulty: "Medium", description: "Circuits, DC/AC theory, diodes and transistors" },
        { code: "312303", name: "Programming in C", hours: 64, difficulty: "Hard", description: "C language: variables, loops, arrays, functions, pointers" },
      ],
      sem3: [
        { code: "313301", name: "Data Structure Using C", hours: 64, difficulty: "Hard", description: "Arrays, linked lists, stacks, queues, trees and sorting" },
        { code: "313302", name: "Database Management System", hours: 48, difficulty: "Medium", description: "SQL, ER diagrams, normalization and database design" },
        { code: "313303", name: "Digital Techniques", hours: 48, difficulty: "Medium", description: "Number systems, Boolean algebra, logic gates and flip-flops" },
        { code: "313304", name: "Object Oriented Programming Using C++", hours: 64, difficulty: "Hard", description: "Classes, inheritance, polymorphism, templates in C++" },
        { code: "313001", name: "Computer Graphics", hours: 48, difficulty: "Medium", description: "2D/3D graphics, transformations, clipping and rendering" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Fundamental rights, directive principles and constitutional values" },
      ],
      sem4: [
        { code: "314301", name: "Environmental Education and Sustainability", hours: 16, difficulty: "Easy", description: "Ecosystem, pollution, renewable energy and sustainability" },
        { code: "314317", name: "Java Programming", hours: 64, difficulty: "Hard", description: "Java OOP, collections, exception handling and JDBC" },
        { code: "314318", name: "Data Communication and Computer Network", hours: 48, difficulty: "Medium", description: "OSI model, TCP/IP, routing, switching and network protocols" },
        { code: "314321", name: "Microprocessor Programming", hours: 48, difficulty: "Hard", description: "8085/8086 architecture, instruction set and assembly programming" },
        { code: "314004", name: "Python Programming", hours: 48, difficulty: "Medium", description: "Python syntax, data structures, functions, file handling and OOP" },
        { code: "314005", name: "UI UX Design", hours: 32, difficulty: "Medium", description: "Design thinking, wireframing, prototyping and usability testing" },
      ],
      sem5: [
        { code: "315319", name: "Operating System", hours: 48, difficulty: "Hard", description: "Process management, scheduling, memory management and file systems" },
        { code: "315323", name: "Software Engineering", hours: 48, difficulty: "Medium", description: "SDLC models, Agile, requirement analysis and project management" },
        { code: "315002", name: "Entrepreneurship Development and Startups", hours: 32, difficulty: "Easy", description: "Business planning, startup ecosystem and entrepreneurial mindset" },
        { code: "315003", name: "Seminar and Project Initiation Course", hours: 32, difficulty: "Medium", description: "Research methodology, technical paper writing and project planning" },
        { code: "315004", name: "Internship (12 Weeks)", hours: 48, difficulty: "Medium", description: "Industry training, practical exposure and professional skills" },
        { code: "315321", name: "Advance Computer Network", hours: 48, difficulty: "Hard", description: "Advanced routing, VPNs, wireless networks and network security", isElective: true },
        { code: "315325", name: "Cloud Computing", hours: 48, difficulty: "Medium", description: "AWS, Azure, GCP, cloud deployment and DevOps basics", isElective: true },
        { code: "315326", name: "Data Analytics", hours: 48, difficulty: "Medium", description: "Data analysis, pandas, matplotlib and statistical insights", isElective: true },
      ],
      sem6: [
        { code: "315301", name: "Management", hours: 32, difficulty: "Easy", description: "Principles of management, planning, organizing and controlling" },
        { code: "316313", name: "Emerging Trends in Computer Engineering and IT", hours: 32, difficulty: "Medium", description: "AI, blockchain, IoT, AR/VR and Industry 4.0 trends" },
        { code: "316314", name: "Software Testing", hours: 48, difficulty: "Medium", description: "Testing types, test case design, automation tools and QA" },
        { code: "316005", name: "Client Side Scripting", hours: 48, difficulty: "Medium", description: "JavaScript, ES6+, DOM manipulation, React fundamentals" },
        { code: "316006", name: "Mobile Application Development", hours: 48, difficulty: "Hard", description: "Android/iOS development using Flutter or React Native" },
        { code: "316004", name: "Capstone Project", hours: 80, difficulty: "Hard", description: "End-to-end software project demonstrating all acquired skills" },
        { code: "316315", name: "Digital Forensic and Hacking Techniques", hours: 48, difficulty: "Hard", description: "Cybersecurity, ethical hacking, penetration testing and forensics", isElective: true },
        { code: "316316", name: "Machine Learning", hours: 48, difficulty: "Hard", description: "ML algorithms, scikit-learn, model training and evaluation", isElective: true },
        { code: "316317", name: "Network and Information Security", hours: 48, difficulty: "Hard", description: "Cryptography, firewalls, intrusion detection and secure protocols", isElective: true },
      ],
    },

    "Information Technology": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Foundation mathematics for engineering applications" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Physics and chemistry fundamentals" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "English communication for professional environments" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Technical drawing and visualization" },
        { code: "311001", name: "Fundamentals of ICT", hours: 32, difficulty: "Easy", description: "Computer basics and information technology concepts" },
        { code: "311002", name: "Engineering Workshop Practice", hours: 32, difficulty: "Medium", description: "Practical workshop and hardware skills" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Wellness and stress management" },
      ],
      sem2: [
        { code: "IF2001", name: "Digital Literacy and Internet Applications", hours: 48, difficulty: "Easy", description: "Internet services, email, cloud tools and digital citizenship" },
        { code: "312303", name: "Programming in C", hours: 64, difficulty: "Hard", description: "C programming fundamentals and problem solving" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Engineering mathematics — calculus and algebra" },
        { code: "IF2004", name: "Operating System Concepts", hours: 32, difficulty: "Medium", description: "Windows and Linux OS operations and administration" },
        { code: "312302", name: "Basic Electrical and Electronics", hours: 48, difficulty: "Medium", description: "Fundamental circuits, components and electronics" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Workplace writing and communication skills" },
      ],
      sem3: [
        { code: "IF3001", name: "Database Administration", hours: 64, difficulty: "Medium", description: "SQL, database design, backup and recovery" },
        { code: "IF3002", name: "Web Technology", hours: 48, difficulty: "Medium", description: "HTML, CSS, JavaScript and responsive design" },
        { code: "313301", name: "Data Structure Using C", hours: 64, difficulty: "Hard", description: "Data structures, algorithms and complexity analysis" },
        { code: "IF3004", name: "Computer Hardware and Networking Basics", hours: 48, difficulty: "Medium", description: "PC components, peripherals and basic networking" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Constitutional rights and civic responsibilities" },
      ],
      sem4: [
        { code: "IF4001", name: "Java Programming", hours: 64, difficulty: "Hard", description: "Java SE: OOP, collections, threads, networking" },
        { code: "IF4002", name: "Computer Network Administration", hours: 48, difficulty: "Medium", description: "Network setup, protocols, DNS, DHCP and security" },
        { code: "IF4003", name: "Python Scripting", hours: 48, difficulty: "Medium", description: "Python for automation, data processing and web scraping" },
        { code: "314301", name: "Environmental Education and Sustainability", hours: 16, difficulty: "Easy", description: "Green IT and environmental management" },
        { code: "IF4005", name: "Cyber Security Fundamentals", hours: 48, difficulty: "Medium", description: "Security threats, encryption, firewalls and best practices" },
        { code: "IF4006", name: "ERP and Business Applications", hours: 32, difficulty: "Medium", description: "SAP basics, business workflows and ERP systems" },
      ],
      sem5: [
        { code: "IF5001", name: "Cloud Services and Virtualization", hours: 48, difficulty: "Medium", description: "AWS/Azure services, VM management and containers" },
        { code: "IF5002", name: "Software Testing and Quality Assurance", hours: 48, difficulty: "Medium", description: "Testing methods, Selenium and CI/CD pipelines" },
        { code: "IF5003", name: "Mobile Application Development", hours: 48, difficulty: "Hard", description: "Android and iOS app development using Flutter" },
        { code: "315002", name: "Entrepreneurship Development", hours: 32, difficulty: "Easy", description: "Business planning and startup management" },
        { code: "IF5005", name: "Data Analytics and Visualization", hours: 48, difficulty: "Medium", description: "Tableau, Power BI and data-driven decision making", isElective: true },
        { code: "IF5006", name: "IoT and Embedded Systems", hours: 48, difficulty: "Hard", description: "Arduino, Raspberry Pi and IoT protocols", isElective: true },
      ],
      sem6: [
        { code: "IF6001", name: "Management Information Systems", hours: 32, difficulty: "Easy", description: "Business intelligence, decision support and IT governance" },
        { code: "IF6002", name: "Artificial Intelligence and ML", hours: 48, difficulty: "Hard", description: "ML algorithms, neural networks and AI applications" },
        { code: "IF6003", name: "DevOps and Agile Practices", hours: 48, difficulty: "Medium", description: "CI/CD, Docker, Kubernetes and Agile methodologies" },
        { code: "IF6004", name: "E-Commerce and Digital Marketing", hours: 32, difficulty: "Easy", description: "Online business models, SEO and digital marketing" },
        { code: "IF6005", name: "Capstone Project (IT)", hours: 80, difficulty: "Hard", description: "Comprehensive IT solution project with documentation" },
        { code: "IF6006", name: "Network Security and Ethical Hacking", hours: 48, difficulty: "Hard", description: "Penetration testing, vulnerability assessment and security audits", isElective: true },
        { code: "IF6007", name: "Blockchain Technology", hours: 48, difficulty: "Hard", description: "Smart contracts, DApps and decentralized applications", isElective: true },
      ],
    },

    "Electronics & Telecommunication": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Engineering mathematics foundations" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Physics and chemistry for electronics" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "Technical communication skills" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Technical drawing and CAD basics" },
        { code: "EJ1001", name: "Basic Electronics", hours: 48, difficulty: "Medium", description: "Diodes, transistors, rectifiers and basic electronic components" },
        { code: "311002", name: "Engineering Workshop Practice", hours: 32, difficulty: "Medium", description: "PCB making, soldering and practical skills" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Physical and mental wellness" },
      ],
      sem2: [
        { code: "EJ2001", name: "Applied Electronics", hours: 64, difficulty: "Hard", description: "Amplifiers, oscillators, op-amps and power electronics" },
        { code: "EJ2002", name: "Digital Electronics", hours: 48, difficulty: "Medium", description: "Logic gates, combinational and sequential circuits" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Laplace transforms, Fourier series and complex numbers" },
        { code: "EJ2004", name: "Electronic Measurement and Instruments", hours: 48, difficulty: "Medium", description: "CRO, multimeter, signal generators and transducers" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Technical report writing and presentation" },
        { code: "EJ2006", name: "Electrical Engineering Fundamentals", hours: 48, difficulty: "Medium", description: "DC/AC circuits, machines and transformers" },
      ],
      sem3: [
        { code: "EJ3001", name: "Linear Integrated Circuits", hours: 64, difficulty: "Hard", description: "Op-amp applications, active filters, timers (555) and PLLs" },
        { code: "EJ3002", name: "Principles of Communication", hours: 48, difficulty: "Medium", description: "AM, FM, PM modulation, demodulation and signal analysis" },
        { code: "EJ3003", name: "Microcontroller", hours: 64, difficulty: "Hard", description: "8051 microcontroller programming and interfacing" },
        { code: "EJ3004", name: "Electronic Product Design", hours: 48, difficulty: "Medium", description: "PCB design, component selection and prototyping" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Constitutional awareness and civic education" },
      ],
      sem4: [
        { code: "EJ4001", name: "Digital Communication", hours: 64, difficulty: "Hard", description: "PCM, digital modulation, multiplexing and error control" },
        { code: "EJ4002", name: "ARM Microprocessor and Embedded C", hours: 48, difficulty: "Hard", description: "ARM architecture, embedded C programming and RTOS basics" },
        { code: "EJ4003", name: "VLSI Design", hours: 48, difficulty: "Hard", description: "CMOS logic, FPGA, Verilog HDL and chip design flow" },
        { code: "EJ4004", name: "Power Electronics", hours: 48, difficulty: "Medium", description: "SCR, MOSFET, inverters and industrial drives" },
        { code: "314301", name: "Environmental Education", hours: 16, difficulty: "Easy", description: "E-waste management and environmental sustainability" },
        { code: "EJ4006", name: "Industrial Electronics", hours: 32, difficulty: "Medium", description: "PLC, sensors, automation and industrial control systems" },
      ],
      sem5: [
        { code: "EJ5001", name: "Wireless Communication", hours: 48, difficulty: "Hard", description: "GSM, CDMA, 4G/5G, WiFi and Bluetooth technologies" },
        { code: "EJ5002", name: "Optical Fiber Communication", hours: 48, difficulty: "Medium", description: "Fiber optics, splicing, DWDM and network installation" },
        { code: "EJ5003", name: "Consumer Electronics", hours: 32, difficulty: "Easy", description: "Smart TVs, home automation and IoT consumer devices" },
        { code: "315002", name: "Entrepreneurship Development", hours: 32, difficulty: "Easy", description: "Electronics startup opportunities and business skills" },
        { code: "EJ5005", name: "Internet of Things", hours: 48, difficulty: "Medium", description: "IoT protocols, MQTT, Raspberry Pi and smart systems", isElective: true },
        { code: "EJ5006", name: "Digital Signal Processing", hours: 48, difficulty: "Hard", description: "DFT, FFT, FIR/IIR filters and signal processing applications", isElective: true },
      ],
      sem6: [
        { code: "EJ6001", name: "Management", hours: 32, difficulty: "Easy", description: "Engineering management, project planning and leadership" },
        { code: "EJ6002", name: "Satellite Communication", hours: 48, difficulty: "Hard", description: "Satellite systems, VSAT, GPS and navigation systems" },
        { code: "EJ6003", name: "Medical Electronics", hours: 48, difficulty: "Medium", description: "ECG, EEG, X-ray equipment and patient monitoring" },
        { code: "EJ6004", name: "Capstone Project", hours: 80, difficulty: "Hard", description: "Electronics project demonstrating design and implementation skills" },
        { code: "EJ6005", name: "Robotics and Automation", hours: 48, difficulty: "Hard", description: "Robot kinematics, servo control and automation systems", isElective: true },
        { code: "EJ6006", name: "RADAR and TV Engineering", hours: 48, difficulty: "Medium", description: "RADAR principles, TV broadcasting and transmission", isElective: true },
      ],
    },

    "Mechanical Engineering": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Engineering mathematics for mechanical applications" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Physics and chemistry fundamentals" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "Technical English and communication" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Machine drawing, isometric views and CAD basics" },
        { code: "ME1001", name: "Workshop Technology", hours: 48, difficulty: "Medium", description: "Fitting, welding, casting, forging and machining basics" },
        { code: "ME1002", name: "Basic Mechanical Engineering", hours: 32, difficulty: "Medium", description: "Machines, mechanisms and basic mechanical concepts" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Physical fitness and wellness" },
      ],
      sem2: [
        { code: "ME2001", name: "Engineering Mechanics", hours: 64, difficulty: "Hard", description: "Statics, dynamics, friction, forces and equilibrium" },
        { code: "ME2002", name: "Material Science", hours: 48, difficulty: "Medium", description: "Properties of metals, alloys, composites and heat treatment" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Integration, differential equations and vectors" },
        { code: "ME2004", name: "Electrical and Electronics Engineering", hours: 48, difficulty: "Medium", description: "AC/DC motors, control systems and electrical safety" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Report writing, technical documentation" },
        { code: "ME2006", name: "Machine Drawing", hours: 48, difficulty: "Medium", description: "Assembly drawings, sectional views and tolerances" },
      ],
      sem3: [
        { code: "ME3001", name: "Strength of Materials", hours: 64, difficulty: "Hard", description: "Stress, strain, beams, torsion and buckling analysis" },
        { code: "ME3002", name: "Thermal Engineering", hours: 48, difficulty: "Hard", description: "Thermodynamics, heat engines, refrigeration and air conditioning" },
        { code: "ME3003", name: "Manufacturing Processes", hours: 64, difficulty: "Medium", description: "Lathe, milling, grinding, welding and sheet metal processes" },
        { code: "ME3004", name: "Fluid Mechanics", hours: 48, difficulty: "Hard", description: "Fluid properties, pressure, flow equations and pumps" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Constitutional framework and rights" },
      ],
      sem4: [
        { code: "ME4001", name: "Theory of Machines", hours: 64, difficulty: "Hard", description: "Kinematics, gears, governors, cams and balancing" },
        { code: "ME4002", name: "Computer Aided Design", hours: 48, difficulty: "Medium", description: "SolidWorks, AutoCAD and 3D modelling" },
        { code: "ME4003", name: "Metrology and Quality Control", hours: 48, difficulty: "Medium", description: "Precision measurement, GD&T and quality standards (ISO)" },
        { code: "ME4004", name: "Machine Design", hours: 48, difficulty: "Hard", description: "Design of joints, shafts, springs and pressure vessels" },
        { code: "314301", name: "Environmental Education", hours: 16, difficulty: "Easy", description: "Industrial pollution control and sustainability" },
        { code: "ME4006", name: "Industrial Management", hours: 32, difficulty: "Easy", description: "Plant layout, inventory, production planning and lean manufacturing" },
      ],
      sem5: [
        { code: "ME5001", name: "Automobile Engineering", hours: 48, difficulty: "Medium", description: "IC engine, transmission, brakes and chassis systems" },
        { code: "ME5002", name: "Industrial Automation and Robotics", hours: 48, difficulty: "Hard", description: "PLC, pneumatics, hydraulics and robot programming" },
        { code: "ME5003", name: "Heat Transfer", hours: 48, difficulty: "Hard", description: "Conduction, convection, radiation and heat exchangers" },
        { code: "315002", name: "Entrepreneurship Development", hours: 32, difficulty: "Easy", description: "Manufacturing business and startup opportunities" },
        { code: "ME5005", name: "Mechatronics", hours: 48, difficulty: "Hard", description: "Sensors, actuators, microcontrollers and integrated systems", isElective: true },
        { code: "ME5006", name: "Refrigeration and Air Conditioning", hours: 48, difficulty: "Medium", description: "Refrigeration cycles, HVAC systems and energy efficiency", isElective: true },
      ],
      sem6: [
        { code: "ME6001", name: "Management", hours: 32, difficulty: "Easy", description: "Project management, quality management and team leadership" },
        { code: "ME6002", name: "Power Plant Engineering", hours: 48, difficulty: "Hard", description: "Thermal, hydro, nuclear and renewable power plants" },
        { code: "ME6003", name: "Advanced Manufacturing Technology", hours: 48, difficulty: "Hard", description: "CNC machining, additive manufacturing and Industry 4.0" },
        { code: "ME6004", name: "Capstone Project", hours: 80, difficulty: "Hard", description: "Mechanical design and fabrication capstone project" },
        { code: "ME6005", name: "Finite Element Analysis", hours: 48, difficulty: "Hard", description: "FEA using ANSYS for stress and thermal analysis", isElective: true },
        { code: "ME6006", name: "Renewable Energy Systems", hours: 48, difficulty: "Medium", description: "Solar, wind, biomass energy and storage technologies", isElective: true },
      ],
    },

    "Civil Engineering": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Engineering mathematics for civil applications" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Physics and chemistry fundamentals" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "Technical communication skills" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Civil drawing, plans, elevation and sections" },
        { code: "CE1001", name: "Engineering Materials", hours: 48, difficulty: "Medium", description: "Cement, concrete, bricks, steel and timber properties" },
        { code: "CE1002", name: "Construction Practice", hours: 32, difficulty: "Medium", description: "Site work, masonry, carpentry and plumbing basics" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Physical fitness and mental wellness" },
      ],
      sem2: [
        { code: "CE2001", name: "Engineering Mechanics", hours: 64, difficulty: "Hard", description: "Force systems, equilibrium, centroid and moment of inertia" },
        { code: "CE2002", name: "Surveying", hours: 64, difficulty: "Medium", description: "Chain, compass, plane table, levelling and contouring" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Calculus, matrices and numerical methods" },
        { code: "CE2004", name: "Electrical Technology", hours: 32, difficulty: "Easy", description: "Electrical installations, safety and basics for civil works" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Technical writing and field reporting" },
      ],
      sem3: [
        { code: "CE3001", name: "Strength of Materials", hours: 64, difficulty: "Hard", description: "Stress, strain, bending moment, shear force and columns" },
        { code: "CE3002", name: "Fluid Mechanics", hours: 64, difficulty: "Hard", description: "Hydrostatics, fluid flow, Bernoulli's equation and pumps" },
        { code: "CE3003", name: "Concrete Technology", hours: 48, difficulty: "Medium", description: "Mix design, curing, testing and special concretes" },
        { code: "CE3004", name: "Computer Aided Drawing", hours: 32, difficulty: "Medium", description: "AutoCAD 2D/3D for civil engineering drawings" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Rights, duties and constitutional framework" },
      ],
      sem4: [
        { code: "CE4001", name: "Structural Analysis", hours: 64, difficulty: "Hard", description: "Beams, frames, trusses and indeterminate structures" },
        { code: "CE4002", name: "Geotechnical Engineering", hours: 48, difficulty: "Hard", description: "Soil classification, shear strength, consolidation and foundations" },
        { code: "CE4003", name: "Transportation Engineering", hours: 48, difficulty: "Medium", description: "Road geometry, pavement design and traffic engineering" },
        { code: "CE4004", name: "Environmental Engineering", hours: 48, difficulty: "Medium", description: "Water supply, sewage treatment and solid waste management" },
        { code: "314301", name: "Environmental Education", hours: 16, difficulty: "Easy", description: "Environmental impact assessment and green building" },
      ],
      sem5: [
        { code: "CE5001", name: "RCC Design", hours: 64, difficulty: "Hard", description: "Design of beams, slabs, columns and footings using IS codes" },
        { code: "CE5002", name: "Construction Management", hours: 48, difficulty: "Medium", description: "Project planning, CPM, PERT, tendering and contracts" },
        { code: "CE5003", name: "Water Resources Engineering", hours: 48, difficulty: "Hard", description: "Dams, irrigation canals, flood control and hydrology" },
        { code: "315002", name: "Entrepreneurship Development", hours: 32, difficulty: "Easy", description: "Construction business and civil engineering startups" },
        { code: "CE5005", name: "Remote Sensing and GIS", hours: 48, difficulty: "Medium", description: "Satellite imagery, GPS and GIS for civil applications", isElective: true },
        { code: "CE5006", name: "Green Building Technology", hours: 48, difficulty: "Medium", description: "LEED certification, sustainable materials and energy-efficient design", isElective: true },
      ],
      sem6: [
        { code: "CE6001", name: "Management", hours: 32, difficulty: "Easy", description: "Construction project management and team leadership" },
        { code: "CE6002", name: "Steel Structure Design", hours: 48, difficulty: "Hard", description: "Tension members, beams, columns and connections using IS 800" },
        { code: "CE6003", name: "Building Services", hours: 32, difficulty: "Medium", description: "HVAC, plumbing, fire fighting and electrical services" },
        { code: "CE6004", name: "Capstone Project", hours: 80, difficulty: "Hard", description: "Civil engineering design or survey project" },
        { code: "CE6005", name: "Smart City Technologies", hours: 48, difficulty: "Medium", description: "Urban planning, IoT infrastructure and smart transportation", isElective: true },
        { code: "CE6006", name: "Earthquake Engineering", hours: 48, difficulty: "Hard", description: "Seismic analysis, IS 1893 and earthquake resistant design", isElective: true },
      ],
    },

    "Electrical Engineering": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Engineering mathematics for electrical applications" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Physics and chemistry fundamentals" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "Technical communication and professional English" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Electrical drawing conventions and circuit diagrams" },
        { code: "EE1001", name: "Electrical Engineering Materials", hours: 32, difficulty: "Medium", description: "Conductors, insulators, semiconductors and magnetic materials" },
        { code: "311002", name: "Engineering Workshop Practice", hours: 32, difficulty: "Medium", description: "Electrical wiring, joints and safety practices" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Physical and mental wellness" },
      ],
      sem2: [
        { code: "EE2001", name: "AC/DC Circuits", hours: 64, difficulty: "Hard", description: "KVL, KCL, resonance, network theorems and AC circuit analysis" },
        { code: "EE2002", name: "Electrical Measurements", hours: 48, difficulty: "Medium", description: "Ammeters, voltmeters, energy meters and CTs/PTs" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Laplace, Fourier and differential equations" },
        { code: "EE2004", name: "Electronics Engineering", hours: 48, difficulty: "Medium", description: "Diodes, transistors, rectifiers and op-amps" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Technical report writing and documentation" },
      ],
      sem3: [
        { code: "EE3001", name: "DC Machines", hours: 64, difficulty: "Hard", description: "DC generator, motor types, characteristics and control" },
        { code: "EE3002", name: "Power Systems", hours: 48, difficulty: "Hard", description: "Generation, transmission, distribution and switchgear" },
        { code: "EE3003", name: "Transformers", hours: 48, difficulty: "Medium", description: "Single/three-phase transformers, testing and maintenance" },
        { code: "EE3004", name: "Digital Electronics", hours: 48, difficulty: "Medium", description: "Logic gates, flip-flops, counters and PLDs" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Constitutional awareness and citizen duties" },
      ],
      sem4: [
        { code: "EE4001", name: "AC Machines", hours: 64, difficulty: "Hard", description: "Induction motors, synchronous machines and single-phase motors" },
        { code: "EE4002", name: "Power Electronics", hours: 64, difficulty: "Hard", description: "Thyristors, converters, inverters and SMPS circuits" },
        { code: "EE4003", name: "Control Systems", hours: 48, difficulty: "Hard", description: "Transfer functions, Bode plots, root locus and PID control" },
        { code: "EE4004", name: "Electrical Installation and Safety", hours: 32, difficulty: "Medium", description: "Wiring systems, protection and IE rules" },
        { code: "314301", name: "Environmental Education", hours: 16, difficulty: "Easy", description: "Energy conservation and sustainable practices" },
      ],
      sem5: [
        { code: "EE5001", name: "Industrial Drives", hours: 48, difficulty: "Hard", description: "VFD, servo drives, motor selection and speed control" },
        { code: "EE5002", name: "PLC and Automation", hours: 48, difficulty: "Medium", description: "PLC programming, SCADA, HMI and industrial automation" },
        { code: "EE5003", name: "Renewable Energy Systems", hours: 48, difficulty: "Medium", description: "Solar, wind, hydro energy systems and grid integration" },
        { code: "315002", name: "Entrepreneurship Development", hours: 32, difficulty: "Easy", description: "Electrical business, solar installation ventures" },
        { code: "EE5005", name: "Smart Grid Technology", hours: 48, difficulty: "Hard", description: "AMI, demand response, energy storage and EV charging", isElective: true },
        { code: "EE5006", name: "Electrical Vehicle Technology", hours: 48, difficulty: "Medium", description: "EV architecture, battery management and charging systems", isElective: true },
      ],
      sem6: [
        { code: "EE6001", name: "Management", hours: 32, difficulty: "Easy", description: "Project management and electrical business operations" },
        { code: "EE6002", name: "High Voltage Engineering", hours: 48, difficulty: "Hard", description: "Insulation, surge protection, testing and HV systems" },
        { code: "EE6003", name: "Power System Protection", hours: 48, difficulty: "Hard", description: "Relays, circuit breakers, protection schemes and stability" },
        { code: "EE6004", name: "Capstone Project", hours: 80, difficulty: "Hard", description: "Electrical engineering design and implementation project" },
        { code: "EE6005", name: "Energy Audit and Management", hours: 48, difficulty: "Medium", description: "Energy auditing, conservation, ISO 50001 and tariff analysis", isElective: true },
        { code: "EE6006", name: "Embedded Systems for Electrical", hours: 48, difficulty: "Hard", description: "Microcontrollers, IoT for energy monitoring and control", isElective: true },
      ],
    },

    "Automobile Engineering": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Engineering mathematics for automobile applications" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Physics and chemistry fundamentals" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "Technical communication and professional skills" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Automotive drawing and component sketching" },
        { code: "AU1001", name: "Auto Workshop Technology", hours: 48, difficulty: "Medium", description: "Fitting, forging, welding and basic auto workshop skills" },
        { code: "ME1002", name: "Basic Mechanical Engineering", hours: 32, difficulty: "Medium", description: "Machines, mechanisms and force concepts" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Physical fitness and mental wellness" },
      ],
      sem2: [
        { code: "AU2001", name: "Engineering Materials", hours: 48, difficulty: "Medium", description: "Metals, polymers, composites and material testing" },
        { code: "AU2002", name: "Engineering Mechanics", hours: 64, difficulty: "Hard", description: "Statics, dynamics, friction and mechanisms" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Calculus, matrices and numerical methods" },
        { code: "AU2004", name: "Electrical and Electronics for Automobiles", hours: 48, difficulty: "Medium", description: "Auto electrical systems, sensors and ECU basics" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Technical documentation and field reporting" },
      ],
      sem3: [
        { code: "AU3001", name: "Engine Technology", hours: 64, difficulty: "Hard", description: "IC engines, combustion, fuel systems and engine performance" },
        { code: "AU3002", name: "Auto Transmission and Drivetrain", hours: 64, difficulty: "Hard", description: "Gearboxes, clutches, differentials and driveline components" },
        { code: "AU3003", name: "Automobile Electrical Systems", hours: 48, difficulty: "Medium", description: "Battery, alternator, ignition, lighting and accessories" },
        { code: "AU3004", name: "Fluid Mechanics for Automobiles", hours: 32, difficulty: "Medium", description: "Hydraulic brakes, power steering and cooling systems" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Constitutional rights and responsibilities" },
      ],
      sem4: [
        { code: "AU4001", name: "Suspension, Braking and Steering", hours: 64, difficulty: "Hard", description: "Suspension geometry, ABS, disc/drum brakes and steering systems" },
        { code: "AU4002", name: "Alternative Fuel Vehicles", hours: 48, difficulty: "Medium", description: "CNG, LPG, hydrogen and biofuel vehicle technologies" },
        { code: "AU4003", name: "Vehicle Body Engineering", hours: 48, difficulty: "Medium", description: "Body construction, safety standards, painting and finishing" },
        { code: "AU4004", name: "Computer Aided Vehicle Design", hours: 32, difficulty: "Medium", description: "SolidWorks/AutoCAD for automotive component design" },
        { code: "314301", name: "Environmental Education", hours: 16, difficulty: "Easy", description: "Emission norms, pollution control and eco-friendly vehicles" },
      ],
      sem5: [
        { code: "AU5001", name: "Automotive Electronics and Diagnostics", hours: 48, difficulty: "Hard", description: "OBD systems, ECU tuning, CAN bus and diagnostic tools" },
        { code: "AU5002", name: "Electric Vehicles", hours: 48, difficulty: "Hard", description: "EV motors, battery packs, BMS and charging infrastructure" },
        { code: "AU5003", name: "Automobile Air Conditioning", hours: 32, difficulty: "Medium", description: "HVAC systems, refrigerants and climate control" },
        { code: "315002", name: "Entrepreneurship Development", hours: 32, difficulty: "Easy", description: "Automobile service business and startup opportunities" },
        { code: "AU5005", name: "Autonomous Vehicle Technology", hours: 48, difficulty: "Hard", description: "LIDAR, radar, cameras and autonomous driving systems", isElective: true },
        { code: "AU5006", name: "Hybrid Vehicle Technology", hours: 48, difficulty: "Medium", description: "HEV architecture, regenerative braking and energy management", isElective: true },
      ],
      sem6: [
        { code: "AU6001", name: "Management", hours: 32, difficulty: "Easy", description: "Service management, spare parts and fleet operations" },
        { code: "AU6002", name: "Vehicle Dynamics and Control", hours: 48, difficulty: "Hard", description: "Handling, stability, traction control and simulation" },
        { code: "AU6003", name: "Emission Control Technology", hours: 48, difficulty: "Medium", description: "Catalytic converters, EGR, BS6 norms and emission testing" },
        { code: "AU6004", name: "Capstone Project", hours: 80, difficulty: "Hard", description: "Automotive engineering design or restoration project" },
        { code: "AU6005", name: "Racing Vehicle Technology", hours: 48, difficulty: "Hard", description: "Performance tuning, aerodynamics and motorsport engineering", isElective: true },
        { code: "AU6006", name: "Advanced Diagnostics and ADAS", hours: 48, difficulty: "Hard", description: "Advanced driver assistance systems and modern diagnostics", isElective: true },
      ],
    },

    "Chemical Engineering": {
      sem1: [
        { code: "311302", name: "Basic Mathematics", hours: 48, difficulty: "Medium", description: "Engineering mathematics fundamentals" },
        { code: "311305", name: "Basic Science", hours: 48, difficulty: "Easy", description: "Chemistry and physics for chemical engineering" },
        { code: "311303", name: "Communication Skills (English)", hours: 32, difficulty: "Easy", description: "Technical communication and documentation" },
        { code: "311008", name: "Engineering Graphics", hours: 48, difficulty: "Hard", description: "Process flow diagrams and P&ID drawings" },
        { code: "CH1001", name: "Chemical Workshop Technology", hours: 32, difficulty: "Medium", description: "Laboratory safety, equipment handling and techniques" },
        { code: "CH1002", name: "Basic Chemical Engineering", hours: 48, difficulty: "Medium", description: "Introduction to chemical processes and unit operations" },
        { code: "311003", name: "Yoga and Meditation", hours: 16, difficulty: "Easy", description: "Physical and mental wellness" },
      ],
      sem2: [
        { code: "CH2001", name: "Applied Chemistry", hours: 64, difficulty: "Hard", description: "Analytical chemistry, electrochemistry and polymer science" },
        { code: "CH2002", name: "Engineering Mechanics", hours: 48, difficulty: "Medium", description: "Forces, equilibrium and mechanical principles" },
        { code: "312301", name: "Applied Mathematics", hours: 48, difficulty: "Hard", description: "Differential equations, vectors and numerical methods" },
        { code: "CH2004", name: "Process Calculations", hours: 64, difficulty: "Hard", description: "Material balance, energy balance and stoichiometry" },
        { code: "312002", name: "Professional Communication", hours: 32, difficulty: "Easy", description: "Lab report writing and technical communication" },
      ],
      sem3: [
        { code: "CH3001", name: "Fluid Flow Operations", hours: 64, difficulty: "Hard", description: "Flow equations, pumps, compressors and piping systems" },
        { code: "CH3002", name: "Heat Transfer Operations", hours: 64, difficulty: "Hard", description: "Conduction, convection, radiation and heat exchangers" },
        { code: "CH3003", name: "Mass Transfer Operations", hours: 64, difficulty: "Hard", description: "Distillation, absorption, extraction and drying" },
        { code: "CH3004", name: "Chemical Reaction Engineering Basics", hours: 48, difficulty: "Hard", description: "Reaction kinetics, reactor design (CSTR, PFR, batch)" },
        { code: "313002", name: "Essence of Indian Constitution", hours: 16, difficulty: "Easy", description: "Constitutional values and rights" },
      ],
      sem4: [
        { code: "CH4001", name: "Chemical Engineering Thermodynamics", hours: 64, difficulty: "Hard", description: "Phase equilibrium, equations of state and thermodynamic cycles" },
        { code: "CH4002", name: "Instrumentation and Process Control", hours: 48, difficulty: "Hard", description: "Process sensors, PID controllers, PLC and SCADA" },
        { code: "CH4003", name: "Industrial Chemistry", hours: 48, difficulty: "Medium", description: "Manufacture of H2SO4, NaOH, cement and petrochemicals" },
        { code: "CH4004", name: "Polymer Technology", hours: 48, difficulty: "Medium", description: "Polymerization, rubber, plastics and their processing" },
        { code: "314301", name: "Environmental Education", hours: 16, difficulty: "Easy", description: "Industrial waste treatment and environmental regulations" },
      ],
      sem5: [
        { code: "CH5001", name: "Petroleum Refining Technology", hours: 48, difficulty: "Hard", description: "Crude oil processing, distillation, cracking and products" },
        { code: "CH5002", name: "Fertilizer Technology", hours: 48, difficulty: "Medium", description: "Ammonia, urea, NPK fertilizer production processes" },
        { code: "CH5003", name: "Food Technology Basics", hours: 32, difficulty: "Easy", description: "Food preservation, processing and packaging technologies" },
        { code: "315002", name: "Entrepreneurship Development", hours: 32, difficulty: "Easy", description: "Chemical plant business and startup opportunities" },
        { code: "CH5005", name: "Pharmaceutical Technology", hours: 48, difficulty: "Medium", description: "Drug formulation, GMP and pharmaceutical manufacturing", isElective: true },
        { code: "CH5006", name: "Green Chemistry and Sustainability", hours: 48, difficulty: "Medium", description: "Sustainable processes, atom economy and clean technology", isElective: true },
      ],
      sem6: [
        { code: "CH6001", name: "Management", hours: 32, difficulty: "Easy", description: "Plant management, HSE and cost estimation" },
        { code: "CH6002", name: "Plant Design and Economics", hours: 48, difficulty: "Hard", description: "Equipment sizing, plant layout, capital costs and profitability" },
        { code: "CH6003", name: "Wastewater Treatment Technology", hours: 48, difficulty: "Medium", description: "ETP/STP design, biological treatment and ZLD systems" },
        { code: "CH6004", name: "Capstone Project", hours: 80, difficulty: "Hard", description: "Chemical process design or product development project" },
        { code: "CH6005", name: "Nanomaterials and Nanotechnology", hours: 48, difficulty: "Hard", description: "Synthesis, characterization and applications of nanomaterials", isElective: true },
        { code: "CH6006", name: "Biofuel Technology", hours: 48, difficulty: "Medium", description: "Biodiesel, biogas and biomass energy production", isElective: true },
      ],
    },
  },

  btech: {
    "Computer Engineering": {
      sem1: [
        { code: "BTK-CE101", name: "Engineering Mathematics I", hours: 60, difficulty: "Hard", description: "Calculus, matrices, linear algebra and differential equations" },
        { code: "BTK-CE102", name: "Engineering Physics", hours: 48, difficulty: "Medium", description: "Mechanics, optics, quantum physics and thermodynamics" },
        { code: "BTK-CE103", name: "Engineering Chemistry", hours: 48, difficulty: "Medium", description: "Electrochemistry, polymers, corrosion and water treatment" },
        { code: "BTK-CE104", name: "Programming Fundamentals (C)", hours: 64, difficulty: "Hard", description: "C programming, control flow, arrays, pointers and functions" },
        { code: "BTK-CE105", name: "Engineering Graphics", hours: 48, difficulty: "Medium", description: "Technical drawing, AutoCAD and 3D visualization" },
        { code: "BTK-CE106", name: "Communication Skills", hours: 32, difficulty: "Easy", description: "Technical writing, presentations and professional communication" },
      ],
      sem2: [
        { code: "BTK-CE201", name: "Engineering Mathematics II", hours: 60, difficulty: "Hard", description: "Laplace transforms, Fourier series, complex variables and probability" },
        { code: "BTK-CE202", name: "Data Structures", hours: 64, difficulty: "Hard", description: "Stacks, queues, trees, graphs, sorting and searching algorithms" },
        { code: "BTK-CE203", name: "Digital Logic Design", hours: 48, difficulty: "Medium", description: "Boolean algebra, combinational/sequential circuits and minimization" },
        { code: "BTK-CE204", name: "Object Oriented Programming (Java)", hours: 64, difficulty: "Hard", description: "Java OOP: classes, interfaces, inheritance, generics and collections" },
        { code: "BTK-CE205", name: "Environmental Science", hours: 32, difficulty: "Easy", description: "Ecosystem, biodiversity, pollution and sustainable development" },
      ],
      sem3: [
        { code: "BTK-CE301", name: "Discrete Mathematics", hours: 48, difficulty: "Hard", description: "Set theory, graph theory, combinatorics and mathematical logic" },
        { code: "BTK-CE302", name: "Database Management Systems", hours: 64, difficulty: "Medium", description: "ER model, SQL, normalization, transactions and ACID properties" },
        { code: "BTK-CE303", name: "Computer Organization and Architecture", hours: 48, difficulty: "Hard", description: "CPU design, pipelining, memory hierarchy and I/O systems" },
        { code: "BTK-CE304", name: "Operating Systems", hours: 64, difficulty: "Hard", description: "Process management, scheduling, memory management, file systems" },
        { code: "BTK-CE305", name: "Web Technologies", hours: 48, difficulty: "Medium", description: "HTML, CSS, JavaScript, Node.js and REST API development" },
      ],
      sem4: [
        { code: "BTK-CE401", name: "Theory of Computation", hours: 48, difficulty: "Hard", description: "Finite automata, pushdown automata, Turing machines and complexity" },
        { code: "BTK-CE402", name: "Computer Networks", hours: 64, difficulty: "Hard", description: "OSI model, TCP/IP, routing protocols, security and wireless networks" },
        { code: "BTK-CE403", name: "Software Engineering", hours: 48, difficulty: "Medium", description: "SDLC, UML, Agile, design patterns and software architecture" },
        { code: "BTK-CE404", name: "Microprocessors and Embedded Systems", hours: 48, difficulty: "Hard", description: "ARM Cortex, RTOS, IoT protocols and embedded C programming" },
        { code: "BTK-CE405", name: "Probability and Statistics", hours: 48, difficulty: "Medium", description: "Random variables, distributions, hypothesis testing and regression" },
      ],
      sem5: [
        { code: "BTK-CE501", name: "Artificial Intelligence", hours: 64, difficulty: "Hard", description: "Search algorithms, knowledge representation, expert systems and ML intro" },
        { code: "BTK-CE502", name: "Compiler Design", hours: 48, difficulty: "Hard", description: "Lexical analysis, parsing, semantic analysis and code generation" },
        { code: "BTK-CE503", name: "Cloud Computing", hours: 48, difficulty: "Medium", description: "AWS, Azure, GCP, virtualization, containerization and DevOps" },
        { code: "BTK-CE504", name: "Mobile App Development", hours: 48, difficulty: "Medium", description: "Flutter/React Native, state management and mobile UI design" },
        { code: "BTK-CE505", name: "Cyber Security", hours: 48, difficulty: "Hard", description: "Cryptography, network security, ethical hacking and OWASP top 10" },
      ],
      sem6: [
        { code: "BTK-CE601", name: "Machine Learning", hours: 64, difficulty: "Hard", description: "Supervised, unsupervised, reinforcement learning and model evaluation" },
        { code: "BTK-CE602", name: "Big Data Analytics", hours: 48, difficulty: "Hard", description: "Hadoop, Spark, MapReduce and data pipeline architectures" },
        { code: "BTK-CE603", name: "Internet of Things", hours: 48, difficulty: "Medium", description: "IoT architecture, MQTT, edge computing and smart applications" },
        { code: "BTK-CE604", name: "Project Management and Ethics", hours: 32, difficulty: "Medium", description: "Agile, Scrum, PMP concepts and professional engineering ethics" },
        { code: "BTK-CE605E", name: "Blockchain Technology (Elective)", hours: 48, difficulty: "Hard", description: "Ethereum, smart contracts, DApps and decentralized finance", isElective: true },
        { code: "BTK-CE606E", name: "Deep Learning (Elective)", hours: 48, difficulty: "Hard", description: "CNNs, RNNs, transformers, GANs and transfer learning", isElective: true },
        { code: "BTK-CE607E", name: "Natural Language Processing (Elective)", hours: 48, difficulty: "Hard", description: "Tokenization, embeddings, NER, sentiment analysis and LLMs", isElective: true },
      ],
      sem7: [
        { code: "BTK-CE701", name: "Distributed Systems", hours: 48, difficulty: "Hard", description: "CAP theorem, consensus algorithms, microservices and Kubernetes" },
        { code: "BTK-CE702", name: "Computer Vision", hours: 48, difficulty: "Hard", description: "Image processing, feature extraction, object detection and CNNs" },
        { code: "BTK-CE703", name: "Major Project Phase I", hours: 80, difficulty: "Hard", description: "Literature review, problem statement and prototype development" },
        { code: "BTK-CE704E", name: "AR/VR Development (Elective)", hours: 48, difficulty: "Hard", description: "Unity, Unreal Engine, ARCore/ARKit and XR applications", isElective: true },
        { code: "BTK-CE705E", name: "Quantum Computing (Elective)", hours: 48, difficulty: "Hard", description: "Qubits, quantum gates, Grover's and Shor's algorithms", isElective: true },
      ],
      sem8: [
        { code: "BTK-CE801", name: "Major Project Phase II", hours: 120, difficulty: "Hard", description: "Full implementation, testing and documentation of the capstone project" },
        { code: "BTK-CE802", name: "Internship / Industrial Training", hours: 80, difficulty: "Medium", description: "Industry internship with technical and professional skill development" },
        { code: "BTK-CE803", name: "Seminar and Technical Presentation", hours: 32, difficulty: "Medium", description: "Research presentation, technical paper writing and viva voce" },
      ],
    },

    "Information Technology": {
      sem1: [
        { code: "BTK-IT101", name: "Engineering Mathematics I", hours: 60, difficulty: "Hard", description: "Calculus, linear algebra and mathematical foundations" },
        { code: "BTK-IT102", name: "Engineering Physics", hours: 48, difficulty: "Medium", description: "Physics fundamentals for IT applications" },
        { code: "BTK-IT103", name: "Programming Fundamentals", hours: 64, difficulty: "Hard", description: "Python programming, problem solving and algorithms" },
        { code: "BTK-IT104", name: "Digital Electronics", hours: 48, difficulty: "Medium", description: "Logic gates, Boolean algebra and combinational circuits" },
        { code: "BTK-IT105", name: "Communication Skills", hours: 32, difficulty: "Easy", description: "Professional communication and technical writing" },
        { code: "BTK-IT106", name: "Engineering Graphics", hours: 48, difficulty: "Medium", description: "Technical drawing and CAD basics" },
      ],
      sem2: [
        { code: "BTK-IT201", name: "Engineering Mathematics II", hours: 60, difficulty: "Hard", description: "Probability, statistics, transforms and discrete math" },
        { code: "BTK-IT202", name: "Data Structures and Algorithms", hours: 64, difficulty: "Hard", description: "Arrays, trees, graphs, sorting and algorithm complexity" },
        { code: "BTK-IT203", name: "Object Oriented Programming", hours: 64, difficulty: "Hard", description: "Java/Python OOP: classes, polymorphism, design patterns" },
        { code: "BTK-IT204", name: "Computer Organization", hours: 48, difficulty: "Medium", description: "CPU architecture, memory and I/O organization" },
        { code: "BTK-IT205", name: "Environmental Science", hours: 32, difficulty: "Easy", description: "Sustainability, digital ecology and green IT" },
      ],
      sem3: [
        { code: "BTK-IT301", name: "Database Systems", hours: 64, difficulty: "Medium", description: "SQL, NoSQL, database design and query optimization" },
        { code: "BTK-IT302", name: "Web Development (Full Stack)", hours: 64, difficulty: "Medium", description: "React, Node.js, REST APIs and modern web frameworks" },
        { code: "BTK-IT303", name: "Operating Systems and Linux", hours: 48, difficulty: "Hard", description: "Linux administration, processes, shell scripting and containers" },
        { code: "BTK-IT304", name: "Computer Networks and Security", hours: 64, difficulty: "Hard", description: "TCP/IP, protocols, firewalls and network security basics" },
        { code: "BTK-IT305", name: "Discrete Mathematics", hours: 48, difficulty: "Hard", description: "Graph theory, logic, sets and combinatorics for IT" },
      ],
      sem4: [
        { code: "BTK-IT401", name: "Software Engineering", hours: 48, difficulty: "Medium", description: "Agile, Scrum, testing, DevOps and software quality" },
        { code: "BTK-IT402", name: "Cloud Infrastructure", hours: 64, difficulty: "Hard", description: "AWS/Azure, Docker, Kubernetes, CI/CD and microservices" },
        { code: "BTK-IT403", name: "Cybersecurity and Ethical Hacking", hours: 48, difficulty: "Hard", description: "Penetration testing, OWASP, VAPT and security frameworks" },
        { code: "BTK-IT404", name: "Mobile Application Development", hours: 64, difficulty: "Medium", description: "Android, iOS, Flutter and cross-platform development" },
        { code: "BTK-IT405", name: "Statistics for Data Science", hours: 48, difficulty: "Medium", description: "Statistical analysis, hypothesis testing and data visualization" },
      ],
      sem5: [
        { code: "BTK-IT501", name: "Machine Learning and AI", hours: 64, difficulty: "Hard", description: "Supervised/unsupervised learning, neural networks and model deployment" },
        { code: "BTK-IT502", name: "Data Engineering", hours: 48, difficulty: "Hard", description: "ETL pipelines, data warehousing, Kafka and data lakes" },
        { code: "BTK-IT503", name: "Enterprise Application Development", hours: 48, difficulty: "Medium", description: "Spring Boot, Microservices, API gateway and enterprise patterns" },
        { code: "BTK-IT504", name: "UI/UX Design and Prototyping", hours: 32, difficulty: "Medium", description: "Figma, design systems, usability testing and accessibility" },
        { code: "BTK-IT505E", name: "Blockchain and DApps (Elective)", hours: 48, difficulty: "Hard", description: "Solidity, smart contracts, Web3 and decentralized applications", isElective: true },
        { code: "BTK-IT506E", name: "Digital Marketing Analytics (Elective)", hours: 48, difficulty: "Medium", description: "SEO, SEM, social media analytics and growth hacking", isElective: true },
      ],
      sem6: [
        { code: "BTK-IT601", name: "Deep Learning and Computer Vision", hours: 64, difficulty: "Hard", description: "CNN, RNN, transformers, image classification and object detection" },
        { code: "BTK-IT602", name: "Internet of Things and Edge Computing", hours: 48, difficulty: "Medium", description: "IoT protocols, edge AI, smart systems and real-time processing" },
        { code: "BTK-IT603", name: "Project Management", hours: 32, difficulty: "Medium", description: "PMP, risk management, cost estimation and team coordination" },
        { code: "BTK-IT604", name: "Data Privacy and Governance", hours: 32, difficulty: "Medium", description: "GDPR, data ethics, privacy by design and compliance" },
        { code: "BTK-IT605E", name: "Natural Language Processing (Elective)", hours: 48, difficulty: "Hard", description: "BERT, GPT, text classification, NER and chatbot development", isElective: true },
        { code: "BTK-IT606E", name: "Game Development (Elective)", hours: 48, difficulty: "Medium", description: "Unity, game physics, AI behavior and game design principles", isElective: true },
      ],
      sem7: [
        { code: "BTK-IT701", name: "Advanced Cybersecurity", hours: 48, difficulty: "Hard", description: "SOC operations, threat intelligence, SIEM and incident response" },
        { code: "BTK-IT702", name: "Distributed Computing", hours: 48, difficulty: "Hard", description: "Spark, Hadoop, stream processing and distributed storage" },
        { code: "BTK-IT703", name: "Major Project Phase I", hours: 80, difficulty: "Hard", description: "Research, design and prototype for the final year project" },
        { code: "BTK-IT704E", name: "Quantum Cryptography (Elective)", hours: 48, difficulty: "Hard", description: "Quantum key distribution, post-quantum cryptography", isElective: true },
      ],
      sem8: [
        { code: "BTK-IT801", name: "Major Project Phase II", hours: 120, difficulty: "Hard", description: "Complete development, testing and deployment of final project" },
        { code: "BTK-IT802", name: "Industry Internship", hours: 80, difficulty: "Medium", description: "Professional IT industry training and practical exposure" },
        { code: "BTK-IT803", name: "Seminar and Viva Voce", hours: 32, difficulty: "Medium", description: "Technical seminar, thesis defense and exit examination" },
      ],
    },

    "Electronics Engineering": {
      sem1: [
        { code: "BTK-EL101", name: "Engineering Mathematics I", hours: 60, difficulty: "Hard", description: "Calculus, complex numbers, Laplace transforms" },
        { code: "BTK-EL102", name: "Engineering Physics", hours: 48, difficulty: "Medium", description: "Wave mechanics, semiconductor physics and electromagnetism" },
        { code: "BTK-EL103", name: "Basic Electronics", hours: 64, difficulty: "Medium", description: "Diodes, BJT, FET, rectifiers and basic circuits" },
        { code: "BTK-EL104", name: "Engineering Graphics", hours: 48, difficulty: "Medium", description: "Circuit drawing, schematics and PCB layout basics" },
        { code: "BTK-EL105", name: "Programming in C", hours: 48, difficulty: "Hard", description: "C programming for embedded applications" },
        { code: "BTK-EL106", name: "Communication Skills", hours: 32, difficulty: "Easy", description: "Technical report writing and professional communication" },
      ],
      sem2: [
        { code: "BTK-EL201", name: "Engineering Mathematics II", hours: 60, difficulty: "Hard", description: "Fourier analysis, probability and numerical methods" },
        { code: "BTK-EL202", name: "Network Analysis and Synthesis", hours: 64, difficulty: "Hard", description: "KVL/KCL, network theorems, resonance and two-port networks" },
        { code: "BTK-EL203", name: "Digital Electronics", hours: 64, difficulty: "Medium", description: "Logic minimization, flip-flops, counters, ADC/DAC" },
        { code: "BTK-EL204", name: "Electronic Measurements", hours: 48, difficulty: "Medium", description: "CRO, spectrum analyzers, sensors and measurement accuracy" },
        { code: "BTK-EL205", name: "Environmental Science", hours: 32, difficulty: "Easy", description: "E-waste, electromagnetic compatibility and green electronics" },
      ],
      sem3: [
        { code: "BTK-EL301", name: "Analog Electronics", hours: 64, difficulty: "Hard", description: "Amplifiers, feedback, oscillators, op-amps and multivibrators" },
        { code: "BTK-EL302", name: "Signals and Systems", hours: 64, difficulty: "Hard", description: "LTI systems, convolution, Z-transform and Fourier analysis" },
        { code: "BTK-EL303", name: "Electromagnetic Theory", hours: 48, difficulty: "Hard", description: "Maxwell's equations, wave propagation and antenna theory basics" },
        { code: "BTK-EL304", name: "Microcontrollers and Embedded C", hours: 64, difficulty: "Hard", description: "ARM, 8051, interrupt handling, RTOS and peripheral interfacing" },
        { code: "BTK-EL305", name: "Data Structures", hours: 48, difficulty: "Medium", description: "Arrays, linked lists, trees and sorting for embedded applications" },
      ],
      sem4: [
        { code: "BTK-EL401", name: "Digital Signal Processing", hours: 64, difficulty: "Hard", description: "DFT, FFT, FIR/IIR filter design and real-time DSP" },
        { code: "BTK-EL402", name: "VLSI Design", hours: 64, difficulty: "Hard", description: "CMOS circuits, FPGA, Verilog HDL and timing analysis" },
        { code: "BTK-EL403", name: "Communication Systems", hours: 64, difficulty: "Hard", description: "Analog/digital modulation, channel capacity and receiver design" },
        { code: "BTK-EL404", name: "Power Electronics", hours: 48, difficulty: "Hard", description: "Converters, inverters, PWM and motor drives" },
        { code: "BTK-EL405", name: "Control Systems", hours: 48, difficulty: "Hard", description: "Transfer functions, root locus, Bode plots and state-space" },
      ],
      sem5: [
        { code: "BTK-EL501", name: "Wireless Communication", hours: 64, difficulty: "Hard", description: "OFDM, MIMO, 5G architecture and spectrum management" },
        { code: "BTK-EL502", name: "Advanced VLSI and SoC Design", hours: 48, difficulty: "Hard", description: "Low-power design, layout, verification and tape-out flow" },
        { code: "BTK-EL503", name: "IoT and Embedded Systems Design", hours: 64, difficulty: "Hard", description: "ESP32, MQTT, cloud integration and firmware development" },
        { code: "BTK-EL504", name: "Image and Video Processing", hours: 48, difficulty: "Hard", description: "Image enhancement, segmentation, compression and GPU processing" },
        { code: "BTK-EL505E", name: "Satellite Communication (Elective)", hours: 48, difficulty: "Hard", description: "Orbital mechanics, transponders, VSAT and GPS systems", isElective: true },
        { code: "BTK-EL506E", name: "Neural Networks for Electronics (Elective)", hours: 48, difficulty: "Hard", description: "TinyML, edge AI and hardware-efficient neural network deployment", isElective: true },
      ],
      sem6: [
        { code: "BTK-EL601", name: "Advanced Communication Networks", hours: 48, difficulty: "Hard", description: "SDN, optical networks, cognitive radio and heterogeneous networks" },
        { code: "BTK-EL602", name: "Biomedical Electronics", hours: 48, difficulty: "Medium", description: "ECG, EEG, ultrasound, MRI and wearable health devices" },
        { code: "BTK-EL603", name: "Renewable Energy Electronics", hours: 48, difficulty: "Medium", description: "Solar inverters, MPPT, wind energy converters and microgrids" },
        { code: "BTK-EL604", name: "Project Management", hours: 32, difficulty: "Medium", description: "Electronics product development lifecycle and team management" },
        { code: "BTK-EL605E", name: "Quantum Electronics (Elective)", hours: 48, difficulty: "Hard", description: "Lasers, photodetectors, quantum communication and photonics", isElective: true },
      ],
      sem7: [
        { code: "BTK-EL701", name: "Advanced DSP and ML", hours: 48, difficulty: "Hard", description: "Adaptive filters, deep learning for signal processing" },
        { code: "BTK-EL702", name: "Radar and Electronic Warfare", hours: 48, difficulty: "Hard", description: "Radar systems, ECM, EW and spectrum sensing" },
        { code: "BTK-EL703", name: "Major Project Phase I", hours: 80, difficulty: "Hard", description: "Electronics/communication project design and initial prototype" },
        { code: "BTK-EL704E", name: "Autonomous Systems (Elective)", hours: 48, difficulty: "Hard", description: "LIDAR, sensor fusion, drone systems and autonomous navigation", isElective: true },
      ],
      sem8: [
        { code: "BTK-EL801", name: "Major Project Phase II", hours: 120, difficulty: "Hard", description: "Final implementation, testing and project report submission" },
        { code: "BTK-EL802", name: "Industry Internship", hours: 80, difficulty: "Medium", description: "Industry exposure at electronics/communication firm" },
        { code: "BTK-EL803", name: "Seminar and Technical Presentation", hours: 32, difficulty: "Medium", description: "Research seminar, patent writing and project viva" },
      ],
    },

    "Mechanical Engineering": {
      sem1: [
        { code: "BTK-ME101", name: "Engineering Mathematics I", hours: 60, difficulty: "Hard", description: "Calculus, vectors and differential equations" },
        { code: "BTK-ME102", name: "Engineering Physics", hours: 48, difficulty: "Medium", description: "Mechanics, thermodynamics and material science" },
        { code: "BTK-ME103", name: "Engineering Chemistry", hours: 48, difficulty: "Medium", description: "Corrosion, fuels, lubricants and polymers" },
        { code: "BTK-ME104", name: "Engineering Graphics and CAD", hours: 64, difficulty: "Medium", description: "2D/3D CAD, machine drawing and GD&T" },
        { code: "BTK-ME105", name: "Workshop Technology", hours: 48, difficulty: "Medium", description: "Machining, welding, casting and fitting" },
        { code: "BTK-ME106", name: "Communication Skills", hours: 32, difficulty: "Easy", description: "Technical writing and professional communication" },
      ],
      sem2: [
        { code: "BTK-ME201", name: "Engineering Mathematics II", hours: 60, difficulty: "Hard", description: "Laplace transforms, Fourier series and numerical methods" },
        { code: "BTK-ME202", name: "Engineering Mechanics (Statics)", hours: 64, difficulty: "Hard", description: "Forces, equilibrium, centroid, friction and moment of inertia" },
        { code: "BTK-ME203", name: "Material Science and Metallurgy", hours: 64, difficulty: "Hard", description: "Crystal structure, phase diagrams, heat treatment and alloys" },
        { code: "BTK-ME204", name: "Programming for Engineers (Python)", hours: 48, difficulty: "Medium", description: "Python, NumPy, SciPy for engineering problem solving" },
        { code: "BTK-ME205", name: "Environmental Science", hours: 32, difficulty: "Easy", description: "Environmental engineering and sustainability" },
      ],
      sem3: [
        { code: "BTK-ME301", name: "Strength of Materials", hours: 64, difficulty: "Hard", description: "Stress, strain, bending, shear, torsion and deflection" },
        { code: "BTK-ME302", name: "Thermodynamics", hours: 64, difficulty: "Hard", description: "Laws, cycles (Rankine, Brayton, Otto) and energy analysis" },
        { code: "BTK-ME303", name: "Manufacturing Technology I", hours: 64, difficulty: "Medium", description: "Casting, forming, welding and joining processes" },
        { code: "BTK-ME304", name: "Fluid Mechanics", hours: 64, difficulty: "Hard", description: "Continuity, Bernoulli, viscous flow and pumps/turbines" },
        { code: "BTK-ME305", name: "Kinematics of Machinery", hours: 48, difficulty: "Hard", description: "Links, cams, gears, gear trains and velocity analysis" },
      ],
      sem4: [
        { code: "BTK-ME401", name: "Manufacturing Technology II", hours: 64, difficulty: "Hard", description: "CNC machining, EDM, laser cutting and advanced processes" },
        { code: "BTK-ME402", name: "Machine Design I", hours: 64, difficulty: "Hard", description: "Shaft design, bearing selection, keys and coupling design" },
        { code: "BTK-ME403", name: "Dynamics of Machinery", hours: 48, difficulty: "Hard", description: "Governors, balancing, vibrations and critical speed" },
        { code: "BTK-ME404", name: "Heat Transfer", hours: 64, difficulty: "Hard", description: "Conduction, convection, radiation and heat exchangers" },
        { code: "BTK-ME405", name: "Metrology and Quality Engineering", hours: 48, difficulty: "Medium", description: "SPC, Six Sigma, GD&T and coordinate measuring machines" },
      ],
      sem5: [
        { code: "BTK-ME501", name: "Finite Element Analysis", hours: 48, difficulty: "Hard", description: "FEM theory, ANSYS simulation for structural and thermal analysis" },
        { code: "BTK-ME502", name: "IC Engines and Combustion", hours: 64, difficulty: "Hard", description: "Engine performance, combustion chemistry and emission control" },
        { code: "BTK-ME503", name: "Industrial Engineering and Management", hours: 48, difficulty: "Medium", description: "Operations research, lean manufacturing and ERP" },
        { code: "BTK-ME504", name: "Refrigeration and Air Conditioning", hours: 48, difficulty: "Medium", description: "Vapor compression, absorption and HVAC system design" },
        { code: "BTK-ME505E", name: "Robotics and Automation (Elective)", hours: 48, difficulty: "Hard", description: "Robot kinematics, trajectory planning and industrial robots", isElective: true },
        { code: "BTK-ME506E", name: "Computational Fluid Dynamics (Elective)", hours: 48, difficulty: "Hard", description: "ANSYS Fluent, turbulence modeling and CFD mesh generation", isElective: true },
      ],
      sem6: [
        { code: "BTK-ME601", name: "Machine Design II", hours: 64, difficulty: "Hard", description: "Pressure vessels, welded joints, springs and gear box design" },
        { code: "BTK-ME602", name: "Power Plant Engineering", hours: 48, difficulty: "Hard", description: "Steam/gas turbine plants, nuclear and combined cycle plants" },
        { code: "BTK-ME603", name: "Additive Manufacturing", hours: 32, difficulty: "Medium", description: "3D printing technologies, materials and design for AM" },
        { code: "BTK-ME604", name: "Project Management", hours: 32, difficulty: "Medium", description: "PMP, CPM, PERT, cost control and risk management" },
        { code: "BTK-ME605E", name: "Micro and Nano Manufacturing (Elective)", hours: 48, difficulty: "Hard", description: "MEMS, LIGA process and micro-fabrication techniques", isElective: true },
      ],
      sem7: [
        { code: "BTK-ME701", name: "Electric and Hybrid Vehicles", hours: 48, difficulty: "Hard", description: "EV powertrain, battery systems, regenerative braking and control" },
        { code: "BTK-ME702", name: "Advanced Manufacturing Systems", hours: 48, difficulty: "Hard", description: "Smart manufacturing, Industry 4.0 and digital twin" },
        { code: "BTK-ME703", name: "Major Project Phase I", hours: 80, difficulty: "Hard", description: "Research, CAD design and experimental setup for final project" },
        { code: "BTK-ME704E", name: "Turbomachinery (Elective)", hours: 48, difficulty: "Hard", description: "Centrifugal pumps, fans, compressors and axial flow machines", isElective: true },
      ],
      sem8: [
        { code: "BTK-ME801", name: "Major Project Phase II", hours: 120, difficulty: "Hard", description: "Final fabrication, testing, analysis and project documentation" },
        { code: "BTK-ME802", name: "Industry Internship", hours: 80, difficulty: "Medium", description: "Manufacturing plant training and practical exposure" },
        { code: "BTK-ME803", name: "Seminar and Project Viva", hours: 32, difficulty: "Medium", description: "Final project presentation and defense examination" },
      ],
    },

    "Civil Engineering": {
      sem1: [
        { code: "BTK-CV101", name: "Engineering Mathematics I", hours: 60, difficulty: "Hard", description: "Calculus, matrices and differential equations" },
        { code: "BTK-CV102", name: "Engineering Physics", hours: 48, difficulty: "Medium", description: "Mechanics and material behavior for civil structures" },
        { code: "BTK-CV103", name: "Engineering Chemistry", hours: 48, difficulty: "Medium", description: "Building materials chemistry, water treatment and corrosion" },
        { code: "BTK-CV104", name: "Engineering Graphics (Civil)", hours: 64, difficulty: "Medium", description: "Plans, sections, isometric drawings and AutoCAD" },
        { code: "BTK-CV105", name: "Construction Technology", hours: 48, difficulty: "Medium", description: "Masonry, concreting, form work and construction sequencing" },
        { code: "BTK-CV106", name: "Communication Skills", hours: 32, difficulty: "Easy", description: "Technical writing and site reporting" },
      ],
      sem2: [
        { code: "BTK-CV201", name: "Engineering Mathematics II", hours: 60, difficulty: "Hard", description: "Fourier series, Laplace transforms and numerical methods" },
        { code: "BTK-CV202", name: "Engineering Mechanics", hours: 64, difficulty: "Hard", description: "Statics, dynamics, bending moment and shear force diagrams" },
        { code: "BTK-CV203", name: "Surveying and Geomatics", hours: 64, difficulty: "Medium", description: "Total station, GPS, drone surveying and digital mapping" },
        { code: "BTK-CV204", name: "Building Materials and Construction", hours: 48, difficulty: "Medium", description: "Cement, steel, glass, timber and modern construction materials" },
        { code: "BTK-CV205", name: "Environmental Science", hours: 32, difficulty: "Easy", description: "Green building, LEED and environmental impact assessment" },
      ],
      sem3: [
        { code: "BTK-CV301", name: "Structural Analysis I", hours: 64, difficulty: "Hard", description: "Determinate structures, beams, frames and influence lines" },
        { code: "BTK-CV302", name: "Fluid Mechanics and Hydraulics", hours: 64, difficulty: "Hard", description: "Open channel flow, pipe flow and hydraulic machinery" },
        { code: "BTK-CV303", name: "Concrete Technology", hours: 64, difficulty: "Medium", description: "Mix design, durability, special concretes and quality control" },
        { code: "BTK-CV304", name: "Geotechnical Engineering I", hours: 64, difficulty: "Hard", description: "Soil properties, classification, permeability and Mohr-Coulomb" },
        { code: "BTK-CV305", name: "Programming for Civil Engineers", hours: 32, difficulty: "Medium", description: "MATLAB/Python for structural analysis and design" },
      ],
      sem4: [
        { code: "BTK-CV401", name: "Structural Analysis II", hours: 64, difficulty: "Hard", description: "Indeterminate structures, stiffness method and moment distribution" },
        { code: "BTK-CV402", name: "Transportation Engineering I", hours: 64, difficulty: "Medium", description: "Highway geometric design, pavement materials and traffic surveys" },
        { code: "BTK-CV403", name: "Environmental Engineering I", hours: 64, difficulty: "Medium", description: "Water supply design, quality standards and treatment processes" },
        { code: "BTK-CV404", name: "Geotechnical Engineering II", hours: 64, difficulty: "Hard", description: "Consolidation, slope stability, pile foundations and retaining walls" },
        { code: "BTK-CV405", name: "Remote Sensing and GIS", hours: 48, difficulty: "Medium", description: "Satellite data, QGIS, spatial analysis and urban planning" },
      ],
      sem5: [
        { code: "BTK-CV501", name: "RCC Design", hours: 64, difficulty: "Hard", description: "Beams, slabs, columns, footings and staircase design by IS 456" },
        { code: "BTK-CV502", name: "Environmental Engineering II", hours: 64, difficulty: "Medium", description: "Sewage treatment, solid waste management and air pollution" },
        { code: "BTK-CV503", name: "Steel Structure Design", hours: 64, difficulty: "Hard", description: "Tension/compression members, beams and connections by IS 800" },
        { code: "BTK-CV504", name: "Water Resources Engineering", hours: 64, difficulty: "Hard", description: "Dams, spillways, irrigation systems and flood management" },
        { code: "BTK-CV505E", name: "Earthquake Engineering (Elective)", hours: 48, difficulty: "Hard", description: "Seismic analysis, IS 1893 and earthquake-resistant design", isElective: true },
        { code: "BTK-CV506E", name: "Green Building Technology (Elective)", hours: 48, difficulty: "Medium", description: "Passive design, solar buildings, GRIHA and energy modeling", isElective: true },
      ],
      sem6: [
        { code: "BTK-CV601", name: "Advanced Foundation Engineering", hours: 64, difficulty: "Hard", description: "Deep foundations, machine foundations and ground improvement" },
        { code: "BTK-CV602", name: "Transportation Engineering II", hours: 48, difficulty: "Hard", description: "Traffic signals, ITS, railway engineering and airport design" },
        { code: "BTK-CV603", name: "Construction Management and Economics", hours: 48, difficulty: "Medium", description: "CPM, PERT, cost estimation, tendering and project finance" },
        { code: "BTK-CV604", name: "Prestressed Concrete Structures", hours: 48, difficulty: "Hard", description: "Pre-tensioning, post-tensioning, losses and design" },
        { code: "BTK-CV605E", name: "Smart Cities Infrastructure (Elective)", hours: 48, difficulty: "Medium", description: "Urban mobility, IoT sensors, smart water and waste systems", isElective: true },
      ],
      sem7: [
        { code: "BTK-CV701", name: "Advanced Structural Design", hours: 48, difficulty: "Hard", description: "Flat slabs, shear walls, bridge decks and IS code advanced topics" },
        { code: "BTK-CV702", name: "Tunnel Engineering", hours: 48, difficulty: "Hard", description: "Tunnel design, TBM, NATM and underground construction" },
        { code: "BTK-CV703", name: "Major Project Phase I", hours: 80, difficulty: "Hard", description: "Literature review, problem formulation and design methodology" },
        { code: "BTK-CV704E", name: "Coastal Engineering (Elective)", hours: 48, difficulty: "Hard", description: "Coastal processes, breakwaters, port and harbor design", isElective: true },
      ],
      sem8: [
        { code: "BTK-CV801", name: "Major Project Phase II", hours: 120, difficulty: "Hard", description: "Full design, analysis and documentation of the final year project" },
        { code: "BTK-CV802", name: "Industry Internship", hours: 80, difficulty: "Medium", description: "Site-based training at construction or consultancy firms" },
        { code: "BTK-CV803", name: "Seminar and Project Viva", hours: 32, difficulty: "Medium", description: "Technical presentation and project defense examination" },
      ],
    },

    "Electrical Engineering": {
      sem1: [
        { code: "BTK-EE101", name: "Engineering Mathematics I", hours: 60, difficulty: "Hard", description: "Calculus, matrices and differential equations" },
        { code: "BTK-EE102", name: "Engineering Physics", hours: 48, difficulty: "Medium", description: "Electromagnetism, quantum mechanics and solid-state physics" },
        { code: "BTK-EE103", name: "Engineering Chemistry", hours: 48, difficulty: "Medium", description: "Electrochemical cells, fuel cells and material science" },
        { code: "BTK-EE104", name: "Basic Electrical Engineering", hours: 64, difficulty: "Hard", description: "KVL/KCL, network theorems, AC circuits and three-phase systems" },
        { code: "BTK-EE105", name: "Engineering Graphics", hours: 48, difficulty: "Medium", description: "Electrical diagrams, single-line diagrams and CAD" },
        { code: "BTK-EE106", name: "Communication Skills", hours: 32, difficulty: "Easy", description: "Technical documentation and professional English" },
      ],
      sem2: [
        { code: "BTK-EE201", name: "Engineering Mathematics II", hours: 60, difficulty: "Hard", description: "Laplace, Z-transform, Fourier and probability theory" },
        { code: "BTK-EE202", name: "Electronic Circuits", hours: 64, difficulty: "Hard", description: "Amplifiers, feedback, oscillators and power supply design" },
        { code: "BTK-EE203", name: "Electrical Measurements", hours: 64, difficulty: "Medium", description: "Instruments, error analysis, bridges and calibration" },
        { code: "BTK-EE204", name: "Digital Electronics", hours: 48, difficulty: "Medium", description: "Logic design, microprocessors and digital systems" },
        { code: "BTK-EE205", name: "Environmental Science", hours: 32, difficulty: "Easy", description: "Energy conservation, renewable energy and sustainability" },
      ],
      sem3: [
        { code: "BTK-EE301", name: "Electromagnetic Field Theory", hours: 64, difficulty: "Hard", description: "Electrostatics, magnetostatics, Maxwell's equations" },
        { code: "BTK-EE302", name: "DC Machines", hours: 64, difficulty: "Hard", description: "DC generator, motor characteristics, testing and control" },
        { code: "BTK-EE303", name: "Signals and Systems", hours: 48, difficulty: "Hard", description: "LTI systems, convolution, Z-transform and Fourier analysis" },
        { code: "BTK-EE304", name: "Transformers and Power Systems I", hours: 64, difficulty: "Hard", description: "Transformer theory, three-phase systems and power generation" },
        { code: "BTK-EE305", name: "Programming for Electrical Engineers", hours: 32, difficulty: "Medium", description: "MATLAB for circuit simulation and power systems analysis" },
      ],
      sem4: [
        { code: "BTK-EE401", name: "AC Machines", hours: 64, difficulty: "Hard", description: "Induction motors, synchronous generators and single-phase motors" },
        { code: "BTK-EE402", name: "Power Electronics", hours: 64, difficulty: "Hard", description: "Thyristors, rectifiers, choppers, inverters and PWM control" },
        { code: "BTK-EE403", name: "Control Systems", hours: 64, difficulty: "Hard", description: "PID, root locus, frequency response and state-space analysis" },
        { code: "BTK-EE404", name: "Power Systems II", hours: 48, difficulty: "Hard", description: "Load flow, fault analysis, stability and economic dispatch" },
        { code: "BTK-EE405", name: "Electrical Installation and Safety", hours: 48, difficulty: "Medium", description: "Wiring design, earthing, protection and electrical safety standards" },
      ],
      sem5: [
        { code: "BTK-EE501", name: "Electric Drives", hours: 64, difficulty: "Hard", description: "VFD drives, servo systems, motor selection and energy efficiency" },
        { code: "BTK-EE502", name: "Power System Protection", hours: 64, difficulty: "Hard", description: "Relays, circuit breakers, protection coordination and SCADA" },
        { code: "BTK-EE503", name: "Renewable Energy Systems", hours: 64, difficulty: "Medium", description: "Solar, wind, hydro, tidal energy and grid integration" },
        { code: "BTK-EE504", name: "High Voltage Engineering", hours: 48, difficulty: "Hard", description: "Insulation, lightning, overvoltage protection and testing" },
        { code: "BTK-EE505E", name: "Smart Grid Technology (Elective)", hours: 48, difficulty: "Hard", description: "AMI, demand response, energy storage and EV charging", isElective: true },
        { code: "BTK-EE506E", name: "Electric Vehicles (Elective)", hours: 48, difficulty: "Hard", description: "EV powertrain, BMS, charging standards and V2G technology", isElective: true },
      ],
      sem6: [
        { code: "BTK-EE601", name: "Industrial Automation", hours: 48, difficulty: "Hard", description: "PLC, SCADA, DCS, HMI and industrial IoT integration" },
        { code: "BTK-EE602", name: "Digital Signal Processing", hours: 48, difficulty: "Hard", description: "FIR/IIR filters, FFT and real-time DSP implementation" },
        { code: "BTK-EE603", name: "Power Quality and Energy Management", hours: 48, difficulty: "Hard", description: "Harmonic analysis, PFC, energy auditing and ISO 50001" },
        { code: "BTK-EE604", name: "Project Management", hours: 32, difficulty: "Medium", description: "Electrical project planning, estimation and team management" },
        { code: "BTK-EE605E", name: "Microgrid and Distributed Energy (Elective)", hours: 48, difficulty: "Hard", description: "Islanded microgrids, droop control and distributed generation", isElective: true },
      ],
      sem7: [
        { code: "BTK-EE701", name: "Advanced Power Electronics", hours: 48, difficulty: "Hard", description: "Multilevel inverters, Z-source converters and wide-bandgap devices" },
        { code: "BTK-EE702", name: "Artificial Intelligence in Power Systems", hours: 48, difficulty: "Hard", description: "ML for load forecasting, fault detection and demand response" },
        { code: "BTK-EE703", name: "Major Project Phase I", hours: 80, difficulty: "Hard", description: "Electrical system design and initial prototype development" },
        { code: "BTK-EE704E", name: "Hydrogen Energy Systems (Elective)", hours: 48, difficulty: "Hard", description: "Fuel cells, electrolyzers and hydrogen storage technologies", isElective: true },
      ],
      sem8: [
        { code: "BTK-EE801", name: "Major Project Phase II", hours: 120, difficulty: "Hard", description: "System implementation, testing and final project presentation" },
        { code: "BTK-EE802", name: "Industry Internship", hours: 80, difficulty: "Medium", description: "Electrical industry or power sector internship" },
        { code: "BTK-EE803", name: "Seminar and Viva Voce", hours: 32, difficulty: "Medium", description: "Technical seminar and final defense of the project" },
      ],
    },
  },
};

export const DIPLOMA_BRANCHES = Object.keys(MSBTE_DATA.diploma);
export const BTECH_BRANCHES = Object.keys(MSBTE_DATA.btech);

export const getSemesters = (courseType: "diploma" | "btech", branch: string, year: string): string[] => {
  const yearSemMap: Record<string, string[]> = {
    "First Year": ["sem1", "sem2"],
    "Second Year": ["sem3", "sem4"],
    "Third Year": ["sem5", "sem6"],
    "Fourth Year": ["sem7", "sem8"],
  };
  return yearSemMap[year] || [];
};

export const getYears = (courseType: "diploma" | "btech"): string[] => {
  if (courseType === "diploma") return ["First Year", "Second Year", "Third Year"];
  return ["First Year", "Second Year", "Third Year", "Fourth Year"];
};

export const getSubjects = (courseType: "diploma" | "btech", branch: string, semester: string): Subject[] => {
  const courseData = MSBTE_DATA[courseType] as BranchData;
  if (!courseData) return [];
  const branchData = courseData[branch];
  if (!branchData) return [];
  return branchData[semester] || [];
};

export const semesterLabel = (sem: string): string => {
  const map: Record<string, string> = {
    sem1: "Semester 1", sem2: "Semester 2", sem3: "Semester 3",
    sem4: "Semester 4", sem5: "Semester 5", sem6: "Semester 6",
    sem7: "Semester 7", sem8: "Semester 8",
  };
  return map[sem] || sem;
};

export const DEMO_QUIZ_QUESTIONS = [
  { id: 1, question: "Which of the following is NOT an Operating System?", options: ["Linux", "Windows", "Oracle", "DOS"], correctAnswer: 2, explanation: "Oracle is a Database Management System, not an Operating System." },
  { id: 2, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctAnswer: 1, explanation: "Binary search halves the search space each time → O(log n)." },
  { id: 3, question: "Which OOP concept allows a class to inherit from another class?", options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"], correctAnswer: 2, explanation: "Inheritance enables one class to acquire properties of another." },
  { id: 4, question: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Tree", "Graph"], correctAnswer: 1, explanation: "A Stack operates on LIFO — last element added is first removed." },
  { id: 5, question: "What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Sequential Query Language", "Structured Question Language"], correctAnswer: 0, explanation: "SQL = Structured Query Language for managing relational databases." },
  { id: 6, question: "Which layer of the OSI model handles routing?", options: ["Data Link", "Network", "Transport", "Physical"], correctAnswer: 1, explanation: "The Network layer (Layer 3) handles routing between networks." },
  { id: 7, question: "What is the primary key in a relational database?", options: ["A key that can be NULL", "A unique identifier for each row", "A foreign key reference", "An indexed column"], correctAnswer: 1, explanation: "A primary key uniquely identifies each record in a table." },
  { id: 8, question: "Which sorting algorithm has the best average-case complexity?", options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], correctAnswer: 2, explanation: "Quick Sort averages O(n log n) which is optimal for comparison-based sorting." },
  { id: 9, question: "In Java, which keyword prevents a class from being subclassed?", options: ["static", "abstract", "final", "private"], correctAnswer: 2, explanation: "The 'final' keyword prevents a class from being extended (subclassed)." },
  { id: 10, question: "What protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correctAnswer: 2, explanation: "HTTPS encrypts web traffic using TLS/SSL for secure communication." },
];
