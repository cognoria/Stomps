const mongoose = require('mongoose');
const { LeadsModel } = require('./worker/models'); // Assuming you have a Leads model

// MongoDB connection
const mongoURL = 'mongodb+srv://stomps0:Stomps0Password@stomps0.wwwzweb.mongodb.net/stomp_app'

async function seedData() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create a sample chatbot document
    const chatbot ='6616b98b404a7467aaf3aaee'
    // Seed some lead data
    const leads = [
      {
        chatbot: chatbot,
        Name: 'John Doe',
        Email: 'john.doe@example.com',
        Phone: '123-456-7890',
      },
      {
        chatbot: chatbot,
        Name: 'Jane Smith',
        Email: 'jane.smith@example.com',
        Phone: '987-654-3210',
      },
      {
        chatbot: chatbot,
        Name: 'Bob Johnson',
        Email: 'bob.johnson@example.com',
        Phone: '555-555-5555',
      },
    ];

    await LeadsModel.insertMany(leads);
    console.log('Data seeded successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData();