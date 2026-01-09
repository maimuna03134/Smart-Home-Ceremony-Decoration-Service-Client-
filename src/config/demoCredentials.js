// src/config/demoCredentials.js
export const DEMO_CREDENTIALS = {
    customer: {
        email: "demo.customer@styledecor.com",
        password: "Customer@123",
        role: "customer",
        name: "Demo Customer"
    },
    decorator: {
        email: "demo.decorator@styledecor.com",
        password: "Decorator@123",
        role: "decorator",
        name: "Demo Decorator"
    },
    admin: {
        email: "demo.admin@styledecor.com",
        password: "Admin@123",
        role: "admin",
        name: "Demo Admin"
    }
};

export const DEMO_RESTRICTION_MESSAGE = {
    customer: "You are using a demo customer account. To book services or make changes, please register with your own account.",
    decorator: "You are using a demo decorator account. To accept projects or update your profile, please register with your own account.",
    admin: "You are using a demo admin account. To add services, assign decorators, or make changes, please register with your own account."
};