import seed from "@/lib/seed";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const search = () => {
  return (
    <SafeAreaView>
      <Text>search</Text>

      <Button
        title="Seed"
        onPress={() =>
          seed().catch((error) =>
            console.log("falid to seed the databas.", error)
          )
        }
      />
    </SafeAreaView>
  );
};

export default search;
