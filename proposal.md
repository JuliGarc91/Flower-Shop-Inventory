# Botanic Haven Website Enhancement Proposal

This proposal envisions the enhancement of the Botanic Haven website, introducing features, improvements, and API integration for a more dynamic and user-friendly experience. The proposal outlines specific objectives and acceptance criteria to achieve an engaging and seamless platform.

## User Stories and Personas for Botanic Haven Website Enhancement Proposal
### Objectives:

**As a user** of the *Botanic Haven* website I want to...so I can contribute to the local community and ecosystem easily from my desktop or mobile device (or in person if I choose to).

1. **...see engaging visuals of local plants available at Botanic Haven**
   - The landing page, index.html, will showcase captivating visuals, presenting the diverse botanical wonders at Botanic Haven.
   - aboutBotanicHaven.html page will contain more information about Botanic Haven
2. **...learn about when and where I can visit the physical garden to view plant inventory and donate plants**
   - The landing page will include info on hours of operation, physical location, and contact information
3. **...become a contributor by filling out a form to donate plants and manage inventory**
   - A form on the landing page allows visitors to become contributors instantly (buttons to navigate to donatePlant.html and plantInventory.html are revealed upon form submission)
   - API Call when submitting form (to donate a plant) on donatePlant.html
4. **...manage inventory online**
   - Fetch data from API to populate collection and append to plantInventory.html
   - Users can toggle inStock dropdown menu
5. **...use the website seamlessly from a mobile device as well as desktop**
   - Adding media queries to CSS style sheet to adjust webpage according to screen sizes of mobile devices

### Personas

1. **Engaging Homepage**
   - *As a user, I want to understand the available activities at Botanic Haven directly from the landing page, so I can see where I can learn more about plants and/or participate in community activities.*
     - **Acceptance Criteria:**
       - The landing page must showcase captivating visuals.
       - Provide a brief overview of available activities.
            - visit physical garden based on times of availability, become a contributor by filling out form on landing page to donate plants online (API Call) and in person and/or manage inventory online (fetch data from API) and in person.
       - The page should encourage active engagement, seamlessly transforming visitors into contributors and fostering a sense of community (call to action).
            - Filling out form to become contributor to access other features like donating a plant by filling out form (API call) or changing inStock status of plants in plant inventory (api call).
            - Physically visiting Botanic Haven

2. **Become a Contributor**
   - *As a user, I desire the option to become a contributor of plants, so I can actively participate in contributing to local ecosystem without having to make the trip to the physical location.*
     - **Acceptance Criteria:**
       - The contributor form should be easily accessible on the landing page.
       - Upon submission, both donatePlant.html and plantInventory.html pages become accessible to the user (who is now a Botanic Haven contributor).

4. **Plan a Visit**
   - *As a user who isn't tech savvy but wants to view plant collection and contribute in person, I want to be informed about the option to physically visit Botanic Haven for planning purposes, so I can still learn about plants and participate in community activities*
     - **Acceptance Criteria:**
        - On landing page have enticing pictures and text that informs visitor of physical location and hours of operation of physical location
        - aboutBotanicHaven.html navigation available on landing page
       
6. **Donate to Initiatives**
   - *As a user who became a Botanic Haven Contributor who doesn't have time to commute, I want a dedicated page for making donations, so I can seamlessly make contributions to my community and local ecosystem from the comfort of my desktop or mobile device*
     - **Acceptance Criteria:**
       - The donation page must have form that makes API call and appends output to the page for easy viewing of user input
       - All site pages will have button that navigates to this page with the form

7. **Manage Plant Collection**
   - *As a user who became a Botanic Haven contributor, I want a dedicated page for plant inventory management, so I can seamlessly manage and update Botanic Haven's extensive plant collection.*
     - **Acceptance Criteria:**
       - navigation button on all pages so user can click on and go to plantInventory.html
       - The inventory page should enable contributors to seamlessly update in-stock status.
       - The inventory page should feature a search bar for contributors to locate and manage specific plants.

## API Integration

- Utilize the [Perenual API](https://perenual.com/docs/api) for:
   - Donor form submissions (donatePlant.html).
   - Fetching data for plant inventory management (plantInventory.html).

## Github page
[Visit Botanic Haven Site Here](https://juligarc91.github.io/Flower-Shop-Inventory/index.html):
https://juligarc91.github.io/Flower-Shop-Inventory/index.html

## Seamless Navigation

1. **View Landing Page (New):**
   - Explore our newly designed landing page, offering an enticing introduction to the world of botanical wonders at Botanic Haven.

2. **Contributor Onboarding and Collection Management (New):**
   - Utilize the updated form on the landing page to seamlessly transition into a contributor role.
   - Manage and update our extensive plant collection, ensuring a dynamic and well-maintained repository once the visitor becomes a contributor.

3. **Donation Page for Contributors:**
   - Exclusive to contributors, our donation page provides a platform for supporting and contributing to our ongoing plant initiatives. Contribute to the growth of Botanic Haven's botanical endeavors.

4. **Inventory Page for Contributors:**
   - As a contributor, take charge of our botanical inventory. Access the dedicated inventory page to update and manage in-stock status, ensuring the smooth operation of our plant inventory.

5. **About Us Section for both Visitors and Contributors:**
   - Gain deeper insights into Botanic Haven's mission and values through a specialized "About Us" section crafted for contributors. Understand how your involvement as a contributor contributes to our shared love for plants and nature.

## Landing Page Redesign
The proposal outlines the implementation of a user-friendly form on the landing page of the Botanic Haven website. This form aims to facilitate visitors in becoming contributors. Upon submission of the form, contributors will be granted access to additional pages, specifically donatePlant.html and plantInventory.html. Within the contributor role, there are two key features highlighted:

1. **User-Friendly Form:**
   - Introduce a streamlined and user-friendly form on the landing page for visitors to become contributors.
   - Upon submission, grant access to additional pages, including donatePlant.html and plantInventory.html.
        1. **Donor Opportunities:**
            - Empower contributors to become donors, supporting Botanic Haven's botanical initiatives.

        2. **Inventory Management:**
            - Allow contributors to actively participate as inventory managers, updating in-stock status.
            - Introduce a new feature: **Search Bar** to search through the inventory easily.

#### Example Text:

**Welcome to Botanic Haven!**

Embark on a journey through a world of botanical wonders that awaits you. Immerse yourself in the beauty of our curated collections right here on our landing page. For a more profound experience, consider making a physical visit to our garden, where you can explore the vast richness of our extensive plant collection.

For those who share our passion for cultivating a greener world, we invite you to seize the opportunity to become a valued contributor. By joining us in this role, you'll unlock exclusive privileges, including the ability to contribute as a donor—providing vital support for our plant initiatives. Additionally, take charge as an inventory manager, ensuring the seamless operation of our botanical inventory by keeping the in-stock status updated.

At Botanic Haven, we are dedicated to fostering a vibrant community of botanical enthusiasts and contributors. Your involvement goes beyond the digital realm; it makes a lasting impact on our shared love for plants and nature.

Join us on this botanical journey, where every visit and contribution contributes to the growth and sustainability of Botanic Haven.

## Conclusion

These proposed enhancements aim to create a more tailored and engaging experience for both visitors and contributors, fostering a sense of community and active participation at Botanic Haven. The seamless navigation, user-friendly contributor onboarding, and exclusive benefits will contribute to the growth and sustainability of Botanic Haven's mission.