import { useState } from "react";
import { postJson } from "../lib/api";

export default function useApiSubmission() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submit = async (endpoint, payload) => {
    if (submitting) return null;
    setSubmitting(true);
    setServerError("");
    setSuccessMessage("");

    try {
      const result = await postJson(endpoint, payload);
      setSuccessMessage(result?.message || "Submitted successfully.");
      return result;
    } catch (error) {
      setServerError(error.message || "Something went wrong. Please try again.");
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const clearSubmissionState = () => {
    setServerError("");
    setSuccessMessage("");
  };

  return { submitting, serverError, successMessage, submit, clearSubmissionState };
}
