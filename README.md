# Railway Welfare Fund Tracker Application

This application reads employee payment data from an Excel file and stores it in a MongoDB database. The data includes employee details such as name, email, department, year of joining, and their payment history from 2020 onwards.

## Features

- Uploads employee payment data from an Excel file.
- Automatically determines the payment status for each year based on the employee's year of joining.
- Stores payment history for each employee, including payment status and amount.
- Error handling for both file reading and database operations.
   
## Prerequisites

- Node.js (version 14 or above)
- MongoDB (local or cloud-based instance)


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nagendrayakkaladevara/payment-details-railwayapplication-backend
   cd employee-payment-uploader
2. **Install dependencies:**

   ```bash
   npm install
3. **Set up MongoDB:**

   Ensure that your MongoDB   instance is running. Update the MongoDB connection string in the app.js file if necessary.

## Usage

1. **Start the application:**

   ```bash
   node app.js

2. **Upload the data:**

The application will automatically read the Excel file and upload the data to the MongoDB database. The default file path is `./LCWALIST2023.xlsx`. If your file is named differently or located elsewhere, update the path in the /upload route in `app.js`.

3. **Verify the upload:**

  Check your MongoDB database to verify that the employee data has been successfully uploaded.




