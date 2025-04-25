 Doctor Listing Page – Campus Assessment
This is a responsive and fully functional Doctor Listing Page built for the Campus Assessment task. The application allows users to search, filter, and sort doctor data using a seamless and dynamic frontend interface.

🚀 Features Implemented
🔎 Autocomplete Search
Type to get top 3 matching doctor names.

Select a suggestion or hit Enter to filter the list.

No suggestions shown if no match is found.

🧪 Dynamic Filter Panel
Consultation Type (Radio):

Video Consult

In Clinic

Specialties (Multi-Select):

25+ specialties available based on dataset.

Sort Options:

Fees (ascending)

Experience (descending)

Filters and search work in combination.

All filter states are synced with URL query parameters.

🧩 Fully Client-Side
All data is fetched once from the provided API:

arduino
Copy
Edit
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
Filtering, sorting, and searching are handled entirely on the client side.

🌐 URL Persistence
Applied filters reflect as query parameters.

Navigating via browser history retains the filter state.

📦 Tech Stack
Framework: React.js / Vanilla JS (as applicable)

CSS: Custom / Tailwind / Bootstrap (based on your implementation)

Deployment: GitHub Pages / Vercel / Netlify (update if deployed)

🧪 Test Case Support
Implemented all data-testid attributes as per specifications to support test automation.

Example:

html
Copy
Edit
<input data-testid="autocomplete-input" />
<div data-testid="doctor-card">
  <h3 data-testid="doctor-name">Dr. Jane Doe</h3>
  <p data-testid="doctor-specialty">Cardiologist</p>
  <span data-testid="doctor-experience">12 years</span>
  <span data-testid="doctor-fee">₹500</span>
</div>
Full list of data-testids supported: ✅
Autocomplete, doctor card, filters (specialties, consultation type), sort options, etc.

📄 Final Submission
📌 Make sure to fill out the final submission form after deployment and testing:
🔗 Final Submission Form

📸 Sample UI Reference
A sample UI image was provided in the assessment for design guidance. This project prioritizes functionality over pixel-perfect UI.

✅ To Run Locally
bash
Copy
Edit
git clone https://github.com/your-username/doctor-listing.git
cd doctor-listing
npm install
npm start
Or if using plain HTML/CSS/JS, simply open index.html in a browser.

🧼 Notes
No backend interaction after initial API fetch.

No advanced UX features like "Clear All" or collapsible filters (as specified).

All code is written with simplicity, clarity, and maintainability in mind.

💡 Author
Created by [hanish] for the Campus Assessment Challenge.
