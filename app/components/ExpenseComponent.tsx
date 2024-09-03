import React from "react";
import { Button, ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTheme } from "./ThemeContext";
import Icon from 'react-native-vector-icons/FontAwesome';

export type Expense = {
    id: string;
    name: string;
    category: string;
    payee: string;
    refCheque: number;
    amount: number;
    paymentMethod: string;
    status: string;
    description: string;
};

export type ExpenseComponentProps = {
    expenses: Expense[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
};

export type ExpenseListTileProps = {
    expense: Expense;
    expenses: Expense[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
    navigation: NavigationProp<any>;
    isDarkMode: boolean;
};

export default function ExpenseComponent({ expenses, setExpenses }: ExpenseComponentProps) {
    const navigation = useNavigation<NavigationProp<any>>();
    const { isDarkMode } = useTheme();

    return (
        <ScrollView className="mb-20">
            {expenses.map((expense) => (
                <ExpenseListTile
                    key={expense.id}
                    expense={expense}
                    expenses={expenses}
                    setExpenses={setExpenses}
                    navigation={navigation}
                    isDarkMode={isDarkMode}
                />
            ))}
        </ScrollView>
    );
}

const ExpenseListTile = ({ expense, expenses, setExpenses, navigation, isDarkMode }: ExpenseListTileProps) => {
    return (
        <View className={`p-4 mb-2 rounded-lg shadow-md border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {expense.name}
            </Text>
            <Text className={`${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                Category: {expense.category}
            </Text>
            <Text className={`${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                Amount: {expense.amount}
            </Text>
            <Text className={`${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                Payment Method: {expense.paymentMethod}
            </Text>
            <Text className={`${isDarkMode ? 'text-gray-200' : 'text-black'}`}>
                Status: {expense.status}
            </Text>
            <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("AddExpense", {
                            editMode: true,
                            expenseData: expense,
                        });
                    }}
                >
                    <Icon name="edit" size={24} color={isDarkMode ? "#007BFF" : "#0033A0"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Delete", "Are you sure you want to delete?", [
                            {
                                text: "Yes",
                                onPress: () => {
                                    let newExpenses = [...expenses];
                                    let index = newExpenses.findIndex((item) => item.id === expense.id);
                                    if (index !== -1) {
                                        newExpenses.splice(index, 1);
                                        setExpenses(newExpenses);
                                    }
                                },
                            },
                            {
                                text: "No",
                                onPress: () => console.log("No"),
                            },
                        ]);
                    }}
                >
                    <Icon name="trash" size={24} color="#FF4D4D" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
