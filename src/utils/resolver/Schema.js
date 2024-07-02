import * as Yup from "yup";

const securitySchema = Yup.object().shape({
  question: Yup.string().required("Security question is required"),
  answer: Yup.string().required("Security answer is required"),
});

export const auth_schema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),

  security: Yup.array().of(securitySchema).min(2, "You must provide at least two security questions and answers"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required")
});
export const email_schema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Security question is required"),
      answer: Yup.string().required("Security answer is required"),
    })
  ).min(2, "Two security questions and answers are required").required("Security questions and answers are required"),

});

export const password_schema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
