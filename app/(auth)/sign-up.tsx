import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const signUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const submit = async () => {
    const { email, name, password } = form;
    if (!name || !email || !password) {
      return Alert.alert("Error", "Please fill all fields");
    }
    setIsSubmitting(true);
    try {
      await createUser({ email, password, name });
      Alert.alert("Success", "You have successfully signed up");
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Error", e.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        label="Full name"
      />
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
      <CustomButton title="Sign Up" onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default signUp;
