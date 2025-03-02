import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: "Please provide a valid email address",
            },
        },
        password: {
            type: String,
            required: function () {
                return this.provider === "credentials"; // Password is required only for credentials provider
            },
            minlength: [6, "Password must be at least 6 characters long"],
            select: false,
        },
        provider: {
            type: String,
            enum: ["credentials", "google"], // Restrict to specific providers
            default: "credentials", // Default provider is "credentials"
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Middleware: Hash password before saving (only for credentials provider)
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new) and the provider is "credentials"
    if (this.provider === "credentials" && this.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt(10); // Generate a salt
            this.password = await bcrypt.hash(this.password, salt); // Hash the password
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Method: Compare password during login (only for credentials provider)
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (this.provider !== "credentials") {
        throw new Error("Password comparison is only allowed for credentials provider");
    }
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create the model
export const User = mongoose.models.User || mongoose.model("User", userSchema);