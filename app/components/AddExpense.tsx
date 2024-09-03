import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Button, Text, TextInput, View, ScrollView } from "react-native";
import { useExpenseContext, ExpenseContextType, Expense } from "./ExpenseContext";
import { useTheme, ThemeContextType } from "./ThemeContext";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Home: undefined;
    AddExpense: { editMode: boolean; expenseData?: Expense };
};

type AddFormProps = {
    route: {
        params: {
            editMode: boolean;
            expenseData?: Expense;
        };
    };
    navigation: StackNavigationProp<RootStackParamList, 'AddExpense'>;
};

const Addform: React.FC<AddFormProps> = ({ route, navigation }) => {
    const { expenses, setExpenses } = useExpenseContext() as ExpenseContextType;
    const { editMode, expenseData } = route.params || {};
    const { isDarkMode } = useTheme() as ThemeContextType;

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [payee, setPayee] = useState<string>("");
    const [category, setCategory] = useState<string>("Food");
    const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
    const [status, setStatus] = useState<string>("Cleared");
    const [refCheque, setRefCheque] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const categories = ["Food", "Clothes", "Bills", "Others"];

    useEffect(() => {
        if (editMode && expenseData) {
            setName(expenseData.name);
            setAmount(expenseData.amount.toString());
            setPayee(expenseData.payee);
            setCategory(expenseData.category);
            setPaymentMethod(expenseData.paymentMethod);
            setStatus(expenseData.status);
            setRefCheque(expenseData.refCheque.toString()); // Ensure refCheque is a string
            setDescription(expenseData.description);
        }
    }, [editMode, expenseData]);

    return (
        <ScrollView className={`p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <View className={`bg-${isDarkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow-lg`}>
                <Text className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {editMode ? "Edit Expense" : "Add Expense"}
                </Text>
                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expense Name</Text>
                <TextInput
                    onChangeText={setName}
                    value={name}
                    className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} p-3 rounded mb-4`}
                    placeholder="Enter the expense name"
                    placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}
                    style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                />
                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Amount</Text>
                <TextInput
                    keyboardType="numeric"
                    onChangeText={(value) => setAmount(value.replace(/[^0-9]/g, ""))}
                    value={amount}
                    className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} p-3 rounded mb-4`}
                    placeholder="Amount"
                    placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}
                    style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                />
                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                </Text>
                <Picker
                    style={{
                        borderColor: isDarkMode ? '#555' : '#DDD',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginBottom: 16,
                        backgroundColor: isDarkMode ? '#333' : '#FFF'
                    }}
                    selectedValue={category}
                    onValueChange={setCategory}
                >
                    {categories.map((cat, index) => (
                        <Picker.Item
                            key={index}
                            label={cat}
                            value={cat}
                            style={{ color: isDarkMode ? 'text-gray-200' : '#000' }}
                        />
                    ))}
                </Picker>

                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Payee</Text>
                <TextInput
                    onChangeText={setPayee}
                    value={payee}
                    className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} p-3 rounded mb-4`}
                    placeholder="Enter the payee name"
                    placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}
                    style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                />
                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-500'}`}>
                    Payment Method
                </Text>
                <Picker
                    style={{
                        borderColor: isDarkMode ? '#555' : '#DDD',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginBottom: 16,
                        backgroundColor: isDarkMode ? '#333' : '#FFF'
                    }}
                    selectedValue={paymentMethod}
                    onValueChange={setPaymentMethod}
                >
                    <Picker.Item
                        label="Credit Card"
                        value="Credit Card"
                        style={{ color: isDarkMode ? 'text-gray-200' : '#000' }}
                    />
                    <Picker.Item
                        label="Cash"
                        value="Cash"
                        style={{ color: isDarkMode ? 'text-gray-200' : '#000' }}
                    />
                    <Picker.Item
                        label="Bank Transfer"
                        value="Bank Transfer"
                        style={{ color: isDarkMode ? 'text-gray-200' : '#000' }}
                    />
                </Picker>

                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                </Text>
                <Picker
                    style={{
                        borderColor: isDarkMode ? '#555' : '#DDD',
                        borderWidth: 1,
                        borderRadius: 4,
                        marginBottom: 16,
                        backgroundColor: isDarkMode ? '#333' : '#FFF'
                    }}
                    selectedValue={status}
                    onValueChange={setStatus}
                >
                    <Picker.Item
                        label="Cleared"
                        value="Cleared"
                        style={{ color: isDarkMode ? 'text-gray-200' : '#000' }}
                    />
                    <Picker.Item
                        label="Uncleared"
                        value="Uncleared"
                        style={{ color: isDarkMode ? 'text-gray-200' : '#000' }}
                    />
                </Picker>

                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ref/Cheque</Text>
                <TextInput
                    keyboardType="numeric"
                    onChangeText={(value) => setRefCheque(value.replace(/[^0-9]/g, ""))}
                    value={refCheque}
                    className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} p-3 rounded mb-4`}
                    placeholder="Enter reference or cheque number"
                    placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}
                    style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                />
                <Text className={`text-lg mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</Text>
                <TextInput
                    onChangeText={setDescription}
                    value={description}
                    className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} p-3 rounded mb-4`}
                    placeholder="Enter description"
                    placeholderTextColor={isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'}
                    style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                    <Button
                        title={editMode ? "Update Expense" : "Add Expense"}
                        onPress={() => {
                            let amountNumber = parseInt(amount, 10);
                            if (amountNumber <= 0 || name === "") {
                                alert("Please enter a valid amount and name");
                                return;
                            }
                            const newExpense: Expense = {
                                id: expenseData?.id || Math.random().toString(),
                                name,
                                amount: Number(amount), // Ensure amount is a number
                                payee,
                                category,
                                paymentMethod,
                                status,
                                refCheque,
                                description,
                                date: expenseData?.date || new Date().toISOString(),
                            };
                            if (editMode && expenseData) {
                                setExpenses(prevExpenses =>
                                    prevExpenses.map(exp =>
                                        exp.id === expenseData.id ? newExpense : exp
                                    )
                                );
                            } else {
                                setExpenses(prevExpenses => [...prevExpenses, newExpense]);
                            }
                            navigation.navigate("Home");
                        }}
                        color={isDarkMode ? "#5A67D8" : "#3182CE"}
                    />
                    <Button
                        title="Cancel"
                        onPress={() => navigation.navigate("Home")}
                        color={isDarkMode ? "#E53E3E" : "#F56565"}
                    />
                </View>

            </View>
        </ScrollView>
    );
};

export default Addform;
