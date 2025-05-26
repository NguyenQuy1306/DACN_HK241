### Overview
Relevant source files
TheMeal is a comprehensive restaurant management system that combines traditional booking functionality with AI-powered predictions and recommendations. This overview introduces the system architecture, key components, and their interactions to provide a foundation for understanding the codebase.

### System at a Glance
TheMeal provides a multi-tenant platform with distinct interfaces for customers, restaurant owners, and system administrators. It enables customers to discover restaurants, make reservations, and order meals, while giving restaurant owners tools to manage tables, menus, and optimize operations through AI-powered overbooking strategies.
<img width="834" alt="{CDA06282-A84B-490F-9DDA-8D29C80FF6DD}" src="https://github.com/user-attachments/assets/92ac2171-9e75-4d49-af2d-972dd9bbb4b4" />
### Core Architecture Components
TheMeal employs a modern microservices-inspired architecture with clear separation of concerns between frontend, backend, and AI services.

**Frontend Application**
The React-based frontend supports three distinct user interfaces:

Customer Interface: Search restaurants, view menus, make reservations, and process payments
Restaurant Owner Dashboard: Manage restaurant information, view analytics, handle orders, and configure settings
Admin Dashboard: Manage platform partners and system administration
The frontend communicates with the backend through RESTful APIs and WebSockets for real-time updates.

**Backend Services**
The Spring Boot backend provides REST APIs and handles core business logic:

Restaurant Management: CRUD operations for restaurants, menus, and tables
Order Processing: Reservation handling, payments, and order statuses
Authentication: User registration, login, and session management
Search & Discovery: Integration with Elasticsearch for advanced search capabilities
Overbooking Management: Configuration of overbooking rules based on AI predictions
**AI Service**
The AI service provides two key capabilities:

No-Show Prediction: Analyzes booking data to predict the likelihood of customers not honoring their reservations
Recommendations: Suggests restaurants to users based on their behavior and preferences
The AI service uses MongoDB for data storage and communicates with the backend through Kafka
<img width="842" alt="{16748708-901B-4B7B-A74F-0E3C90B1208B}" src="https://github.com/user-attachments/assets/e9306525-27ea-4ad0-a23f-1b2ed9018f92" />
### System Integration and Deployment
TheMeal uses Docker Compose for containerization and deployment, with services including:

<img width="423" alt="{6935DDC1-2DB9-4A4E-85A3-2D281D55522A}" src="https://github.com/user-attachments/assets/40256e7b-6930-4e5f-b76a-188e41c63c3c" />

