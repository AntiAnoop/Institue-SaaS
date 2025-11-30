// ---------------------------------------------------------
// REALISTIC LOCAL DATABASE (Scaled Data for Sorting/Filtering)
// ---------------------------------------------------------

export const MOCK_DB = {
  tenants: [
    { id: "pinkal", name: "Pinkal Classes", domain: "pinkal.localhost" },
    { id: "divesh", name: "Divesh Academy", domain: "divesh.localhost" }
  ],
  users: [
    // --- PINKAL CLASSES: 12th Commerce - Batch A (Toppers) ---
    { id: "p_12A_01", name: "Aarav Patel", mobile: "9000000001", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch A", stats: { attendance: 98, marks: 95, fees_due: 0 } },
    { id: "p_12A_02", name: "Ishita Sharma", mobile: "9000000002", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch A", stats: { attendance: 96, marks: 92, fees_due: 0 } },
    { id: "p_12A_03", name: "Rohan Gupta", mobile: "9000000003", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch A", stats: { attendance: 92, marks: 88, fees_due: 5000 } },
    { id: "p_12A_04", name: "Sanya Malhotra", mobile: "9000000004", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch A", stats: { attendance: 85, marks: 81, fees_due: 0 } },
    { id: "p_12A_05", name: "Vihaan Shah", mobile: "9000000005", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch A", stats: { attendance: 89, marks: 85, fees_due: 0 } },

    // --- PINKAL CLASSES: 12th Commerce - Batch B (Average/Late Fees) ---
    { id: "p_12B_01", name: "Aditya Kumar", mobile: "9000000006", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch B", stats: { attendance: 75, marks: 65, fees_due: 15000 } },
    { id: "p_12B_02", name: "Diya Singh", mobile: "9000000007", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch B", stats: { attendance: 82, marks: 72, fees_due: 8000 } },
    { id: "p_12B_03", name: "Kabir Joshi", mobile: "9000000008", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch B", stats: { attendance: 60, marks: 55, fees_due: 25000 } },
    { id: "p_12B_04", name: "Meera Reddy", mobile: "9000000009", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch B", stats: { attendance: 88, marks: 78, fees_due: 2000 } },
    { id: "p_12B_05", name: "Vivaan Mehta", mobile: "9000000010", password: "pass", role: "student", tenant_id: "pinkal", class: "12th Commerce", batch: "Batch B", stats: { attendance: 70, marks: 60, fees_due: 12000 } },

    // --- PINKAL CLASSES: 11th Commerce (New Admission) ---
    { id: "p_11A_01", name: "Ananya Das", mobile: "9000000011", password: "pass", role: "student", tenant_id: "pinkal", class: "11th Commerce", batch: "Batch A", stats: { attendance: 90, marks: 85, fees_due: 5000 } },
    { id: "p_11A_02", name: "Dhruv Patel", mobile: "9000000012", password: "pass", role: "student", tenant_id: "pinkal", class: "11th Commerce", batch: "Batch A", stats: { attendance: 85, marks: 75, fees_due: 10000 } },
    
    // --- DIVESH ACADEMY (For Comparison) ---
    { id: "d1", name: "Arjun Singh", mobile: "1234567890", password: "pass", role: "student", tenant_id: "divesh", batch: "Morning", class: "JEE Mains", stats: { attendance: 65, marks: 70, fees_due: 25000 } },

    // --- STAFF ---
    { id: "admin_pinkal", name: "Pinkal Sir", mobile: "admin", password: "admin", role: "admin", tenant_id: "pinkal", batch: "Admin", class: "Owner" },
    { id: "admin_divesh", name: "Divesh Sir", mobile: "admin", password: "admin", role: "admin", tenant_id: "divesh", batch: "Admin", class: "Owner" },
  ],

  courses: [
    { id: "c1", tenant_id: "pinkal", title: "Accounts Masterclass", lessons: 12, duration: "24h", progress: 45 },
    { id: "c3", tenant_id: "divesh", title: "Physics: Rotational Motion", lessons: 20, duration: "40h", progress: 15 },
  ]
};

export async function loginUser(mobile: string, password: string, tenantDomain: string) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const cleanMobile = mobile ? mobile.trim() : '';
  const cleanPassword = password ? password.trim() : '';
  let tenantId = tenantDomain ? tenantDomain.split('.')[0].toLowerCase() : "pinkal";
  
  if (tenantId === "undefined" || tenantId === "null" || tenantId === "localhost") {
      tenantId = "pinkal"; 
  }

  const user = MOCK_DB.users.find(
    (u) => u.mobile === cleanMobile && u.tenant_id === tenantId
  );

  if (!user || user.password !== cleanPassword) {
    return { error: "Invalid credentials. Please check your login details." };
  }
  
  return { success: true, user };
}