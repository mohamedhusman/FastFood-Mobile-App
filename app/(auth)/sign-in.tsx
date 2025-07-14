import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signInFunc } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React from "react";
import { Alert, Text, View } from "react-native";

const signIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      return Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);
    try {
      signInFunc({ email, password });
      Alert.alert("Success", "You have successfully signed in");
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Something went wrong");
      Sentry.captureEvent(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        label="password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default signIn;
