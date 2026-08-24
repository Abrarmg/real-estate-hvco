

async function testFullAudit() {
  const payload = {
    contact: {
      firstName: "TestUser",
      email: "test@example.com",
      phone: "555-0100",
      websiteOrBrokerage: "Test Brokerage",
      crmPlatform: "Follow Up Boss"
    },
    answers: {
      leadVolume: "10-20",
      leadSource: "Zillow",
    },
    scores: {
      overallScore: 65,
      speedToLead: 50,
      followUp: 70,
      qualification: 60,
      appointmentFlow: 80,
      reactivation: 40
    },
    primaryLeak: { name: "Lead Reactivation" },
    secondaryLeak: { name: "Speed-to-Lead" },
    tertiaryLeak: { name: "Lead Qualification" }
  };

  try {
    const res = await fetch('http://localhost:3001/api/generate-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Full Audit Test Response:", data);
  } catch (error) {
    console.error("Full Audit Test Failed:", error);
  }
}

testFullAudit();
