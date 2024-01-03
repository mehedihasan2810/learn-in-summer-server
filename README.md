# [Learn In Summer - A Music Education Platform](https://learn-in-summer.web.app)

## [Front-End Source Code](https://github.com/mehedihasan2810/learn-in-summer-client)

# Key Features:-

## User Management:

1. **_Add User:_**

   - Endpoint for creating and adding new users to the system.

2. **_Get Users:_**

   - Endpoint for retrieving a list of all users in the system.

3. **_Get User:_**

   - Endpoint for fetching details of a specific user based on provided parameters.

4. **_Update User Role:_**

   - Endpoint for modifying the role of a user, allowing for changes in user permissions.

5. **_JWT Authentication:_**

   - Endpoint for generating JWT (JSON Web Token) for user authentication.

---

## Class Management:

1. **_Add Class:_**

   - Endpoint for adding new classes, including class details such as name, instructor, available seats, price, etc.

2. **_Get All Classes:_**

   - Endpoint for retrieving a list of all classes available in the system.

3. **_Get Single Class:_**

   - Endpoint for fetching details of a specific class based on provided parameters.

4. **_Update Class:_**

   - Endpoint for modifying the details of a class, such as available seats, price, or duration.

5. **_Delete Class:_**

   - Endpoint for removing a class from the system, possibly after it has ended or is no longer available.

6. **_Approve/Deny Class:_**

   - Endpoints for updating the approval status of a class, allowing for administrative control.

---

## Instructor Management:

1. **_Get Instructor Classes:_**

   - Endpoint for fetching a list of classes associated with a specific instructor.
     Payment Handling:

2. **_Create Payment Intent:_**

   - Endpoint for initiating a payment with Stripe, generating a client secret for handling the payment on the client side.

3. **_Handle Payments:_**

   - Endpoint for processing and storing payment information, including updating class enrollments and available seats.

4. **_Get Payment Details:_**

   - Endpoint for retrieving payment details based on user-specific parameters.

5. **_Get Enrolled Classes:_**

   - Endpoint for fetching a list of classes in which a user is enrolled.

---

## Error Handling:

1. **_Not Found Route:_**

   - Endpoint handling 404 errors for routes that do not exist.

2. **_Server Error Handling:_**

   - Endpoint handling 500 errors for internal server errors.

---

## Technologies used:-

- Front-End - `ReactJS` `React Query` `Axios` `Material UI` `React Hook Form` `gsap` `CSS` - [Front-End Repo](https://github.com/mehedihasan2810/learn-in-summer-client)
- Charts - `Recharts`
- Back-End - `NodeJS` `ExpressJS` `MongoDB` `Mongoose` `Typescript` `JWT`
- Auth - `Firebase Auth` `JWT`
- Payment System - `Stripe API`
