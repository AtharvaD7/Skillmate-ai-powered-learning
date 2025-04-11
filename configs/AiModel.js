const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const NEXT_PUBLIC_GEMINI_API_KEY = "/api/chat-user";

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const generationConfig2 = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/html",
};

    //
export const courseOutlineAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Generate a study material for Python for Exam and level of difficulty will be Easy with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter. all results in JSON format" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"courseTitle\": \"Python Fundamentals: Exam Prep - Easy Level\",\n  \"courseSummary\": \"This study material covers the fundamental concepts of Python programming, geared towards beginners and those preparing for a basic Python exam. It focuses on core syntax, data types, control flow, and basic data structures. The material is designed to be easy to understand and provides clear examples to solidify learning.\",\n  \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"Introduction to Python\",\n      \"chapterSummary\": \"This chapter introduces Python as a programming language, its features, advantages, and installation process. It also covers writing and running your first Python program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Features of Python (interpreted, dynamically typed, high-level)\",\n        \"Advantages of Python (readability, versatility, large community)\",\n        \"Installing Python (Anaconda, pip)\",\n        \"Setting up a Python IDE (VS Code, IDLE)\",\n        \"Writing and running your first Python program ('Hello, World!')\",\n        \"Basic Syntax and Indentation\"\n      ]\n    },\n    {\n      \"chapterNumber\": 2,\n      \"chapterTitle\": \"Data Types and Variables\",\n      \"chapterSummary\": \"This chapter explains the different data types available in Python (integers, floats, strings, booleans) and how to declare and use variables to store data.\",\n      \"topics\": [\n        \"Data Types (Integers, Floats, Strings, Booleans)\",\n        \"Variables (Declaring, Assigning, Naming Conventions)\",\n        \"Type Conversion (int(), float(), str(), bool())\",\n        \"Basic Arithmetic Operators (+, -, *, /, %)\",\n        \"String Concatenation\",\n        \"String Formatting (f-strings)\"\n      ]\n    },\n    {\n      \"chapterNumber\": 3,\n      \"chapterTitle\": \"Input and Output\",\n      \"chapterSummary\": \"This chapter focuses on how to take input from the user using the `input()` function and display output to the console using the `print()` function.\",\n      \"topics\": [\n        \"The `input()` function (taking user input)\",\n        \"The `print()` function (displaying output)\",\n        \"Formatting output using `print()`\",\n        \"Converting input data to appropriate data types\",\n        \"Basic Error Handling (invalid input)\"\n      ]\n    },\n    {\n      \"chapterNumber\": 4,\n      \"chapterTitle\": \"Control Flow (Conditional Statements)\",\n      \"chapterSummary\": \"This chapter introduces conditional statements (`if`, `elif`, `else`) that allow you to execute different blocks of code based on certain conditions.\",\n      \"topics\": [\n        \"Conditional Statements (`if`, `elif`, `else`)\",\n        \"Comparison Operators (==, !=, >, <, >=, <=)\",\n        \"Logical Operators (and, or, not)\",\n        \"Nested `if` statements\",\n        \"Simple decision-making examples\"\n      ]\n    },\n    {\n      \"chapterNumber\": 5,\n      \"chapterTitle\": \"Control Flow (Loops)\",\n      \"chapterSummary\": \"This chapter explains how to use loops (`for`, `while`) to repeat a block of code multiple times.\",\n      \"topics\": [\n        \"`for` loop (iterating over a sequence)\",\n        \"`while` loop (repeating until a condition is false)\",\n        \"`break` statement (exiting a loop)\",\n        \"`continue` statement (skipping to the next iteration)\",\n        \"Looping through strings and numbers\",\n        \"Nested Loops\"\n      ]\n    },\n    {\n      \"chapterNumber\": 6,\n      \"chapterTitle\": \"Lists\",\n      \"chapterSummary\": \"This chapter introduces lists, which are ordered collections of items. It covers creating, accessing, modifying, and manipulating lists.\",\n      \"topics\": [\n        \"What is a list?\",\n        \"Creating a list\",\n        \"Accessing elements in a list (indexing)\",\n        \"List slicing\",\n        \"Modifying lists (adding, removing, changing elements)\",\n        \"List methods (append, insert, remove, pop, len, sort)\",\n        \"Iterating through a list using a `for` loop\"\n      ]\n    },\n        {\n      \"chapterNumber\": 7,\n      \"chapterTitle\": \"Tuples\",\n      \"chapterSummary\": \"This chapter introduces tuples, which are ordered, immutable collections of items. It covers creating, accessing tuple elements.\",\n      \"topics\": [\n        \"What is a tuple?\",\n        \"Creating a tuple\",\n        \"Accessing elements in a tuple (indexing)\",\n        \"Tuple slicing\",\n        \"Immutability of tuples\",\n        \"Tuple methods (count, index)\",\n        \"Iterating through a tuple using a `for` loop\"\n      ]\n    },\n    {\n      \"chapterNumber\": 8,\n      \"chapterTitle\": \"Dictionaries\",\n      \"chapterSummary\": \"This chapter introduces dictionaries, which are collections of key-value pairs. It covers creating, accessing, modifying, and manipulating dictionaries.\",\n      \"topics\": [\n        \"What is a dictionary?\",\n        \"Creating a dictionary\",\n        \"Accessing values in a dictionary (using keys)\",\n        \"Adding and modifying key-value pairs\",\n        \"Removing key-value pairs\",\n        \"Dictionary methods (keys, values, items, get)\",\n        \"Iterating through a dictionary using a `for` loop\"\n      ]\n    },\n    {\n      \"chapterNumber\": 9,\n      \"chapterTitle\": \"Functions\",\n      \"chapterSummary\": \"This chapter covers the basics of functions, including defining, calling, and passing arguments to functions. It also covers the concept of return values.\",\n      \"topics\": [\n        \"What is a function?\",\n        \"Defining a function (using `def`)\",\n        \"Calling a function\",\n        \"Function arguments (positional, keyword)\",\n        \"Return values\",\n        \"Function scope (local vs. global variables)\",\n        \"Simple function examples\"\n      ]\n    },\n    {\n      \"chapterNumber\": 10,\n      \"chapterTitle\": \"Error Handling (Basic)\",\n      \"chapterSummary\": \"This chapter introduces the basics of error handling using `try-except` blocks to gracefully handle potential errors in your code.\",\n      \"topics\": [\n        \"What is an exception?\",\n        \"`try-except` blocks\",\n        \"Handling specific exceptions (e.g., `ZeroDivisionError`, `ValueError`)\",\n        \"`else` and `finally` blocks (optional)\",\n        \"Basic error message handling\"\n      ]\n    }\n  ]\n}\n```\n" },
      ],
    },
  ],
});

    //notes
export const generateNotesAiModel = model.startChat({
  generationConfig2,
  history: [
    {
      "role": "user",
      parts: [
        {
          text: "Generate exam material in detailed content for each chapter. Follow these guidelines:\n\nEnsure all topic points are covered in the content.\nProvide the output in HTML format (Do not include <html>, <head>, <body>, or <title> tags) and do not include the '\\n' in the output and if it is there then remove and give output accordingly.\nUse clear and structured formatting with:\n<h2> for chapter title\n<p><strong>Chapter Summary:</strong></p> for chapter summary\n<h3> for each topic title\n<p> for explanations\n<div style=\"background-color: black; color: white; padding: 10px; border-radius: 5px; font-family: monospace;\"><pre> for code examples and output of the code</pre></div>, ensuring they appear inside a black block with white text\n<p><em>Key Point:</em></p> for key takeaways the chapters will be like this: \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"Introduction to DBMS\",\n      \"chapterSummary\": \"Overview of DBMS, its advantages, different types of DBMS, and basic database concepts.\",\n      \"topics\": [\n        \"What is a Database?\",\n        \"What is a DBMS?\",\n        \"Advantages of using a DBMS\"\n      ]\n    }"
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```html<h2>Chapter 1: Introduction to DBMS</h2><p><strong>Chapter Summary:</strong> Overview of DBMS, its advantages, different types of DBMS, and basic database concepts.</p><h3>What is a Database?</h3><p>A database is an organized collection of structured information, or data, typically stored electronically in a computer system. Databases are designed to allow efficient storage, retrieval, modification, and deletion of data. Data within a database is usually modeled in rows and columns in a series of tables to make processing and data querying more efficient. Data can then be easily accessed, managed, modified, updated, controlled, and organized.</p><p><em>Key Point:</em> A database is a structured collection of data organized for efficient access and management.</p><h3>What is a DBMS?</h3><p>A Database Management System (DBMS) is a software application that interacts with users, other applications, and the database itself to capture and analyze data. A DBMS provides a way to create, retrieve, update, and manage databases. It essentially serves as an interface between the database and the end-users or application programs, ensuring data consistency, security, and integrity.</p><p><em>Key Point:</em> A DBMS is the software that allows you to interact with and manage databases.</p><h3>Advantages of using a DBMS</h3><p>Using a DBMS offers several advantages, including:</p><ul><li><strong>Data Integrity:</strong> DBMS enforces integrity constraints to ensure data accuracy and consistency.</li><li><strong>Data Security:</strong> DBMS provides security features to restrict unauthorized access to the database.</li><li><strong>Data Redundancy Reduction:</strong> DBMS helps to minimize data duplication, saving storage space and improving data consistency.</li><li><strong>Data Consistency:</strong> DBMS ensures that data is consistent across the database, preventing conflicting information.</li><li><strong>Efficient Data Access:</strong> DBMS provides efficient ways to access and retrieve data, improving application performance.</li><li><strong>Data Sharing:</strong> DBMS allows multiple users and applications to access and share data concurrently.</li><li><strong>Backup and Recovery:</strong> DBMS provides mechanisms for backing up data and recovering from failures.</li></ul><p><em>Key Point:</em> DBMS offers significant benefits in terms of data integrity, security, efficiency, and manageability.</p><h3>Code Example:</h3><div style=\"background-color: black; color: white; padding: 10px; border-radius: 5px; font-family: monospace;\"><pre>public static void main(String[] args) {\n  int age = 25;\n  System.out.println(\"Age: \" + age);\n}</pre></div><h3>Output:</h3><div style=\"background-color: black; color: white; padding: 10px; border-radius: 5px; font-family: monospace;\"><pre>Age: 25</pre></div>```"
        },
      ],
    },
    
    
  ],
});

export const GenerateStudyTypeContentAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate the flashcard on topic : Flutter Fundamentals,User Interface (UI) Development,Basic App Navigation in JSON format with front back content, Maximum 15\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n[\n  {\n    \"front\": \"What is Flutter?\",\n    \"back\": \"Flutter is a UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.\"\n  },\n  {\n    \"front\": \"What is a Widget in Flutter?\",\n    \"back\": \"A Widget describes the configuration for an Element. It's the basic building block of Flutter's UI. Everything is a Widget!\"\n  },\n  {\n    \"front\": \"What are the two main types of Widgets?\",\n    \"back\": \"StatefulWidget and StatelessWidget.\"\n  },\n  {\n    \"front\": \"What is a StatelessWidget?\",\n    \"back\": \"A Widget that does not have any mutable state. Its properties cannot change over time.\"\n  },\n  {\n    \"front\": \"What is a StatefulWidget?\",\n    \"back\": \"A Widget that has mutable state. Its properties can change over time, causing the UI to rebuild.\"\n  },\n  {\n    \"front\": \"What is the purpose of the `build` method in a Widget?\",\n    \"back\": \"The `build` method is responsible for describing the part of the user interface represented by this widget.\"\n  },\n  {\n    \"front\": \"What is the `initState` method used for in a StatefulWidget?\",\n    \"back\": \"The `initState` method is called only once when the StatefulWidget is first created. It's used for initialization tasks.\"\n  },\n  {\n    \"front\": \"What is the `setState()` method used for?\",\n    \"back\": \"The `setState()` method is used to notify the framework that the internal state of a StatefulWidget has changed, triggering a rebuild of the UI.\"\n  },\n  {\n    \"front\": \"What is the purpose of the `Scaffold` Widget?\",\n    \"back\": \"The `Scaffold` widget provides basic layout structures for a typical app screen, including an `AppBar`, `Body`, `Drawer`, and `BottomNavigationBar`.\"\n  },\n  {\n    \"front\": \"What is the role of a `Container` Widget?\",\n    \"back\": \"The `Container` Widget allows you to apply padding, margins, borders, background colors, and other visual effects to its child widget.\"\n  },\n  {\n    \"front\": \"What is `MaterialApp`?\",\n    \"back\": \"`MaterialApp` is a convenience widget that wraps a number of widgets that are commonly required for applications implementing Material Design.\"\n  }\n]\n```"},
      ],
    },
  ],
})

export const GenerateQuizAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate Quiz on topic: Introduction to Java, Data Types, Variables, and Operators, Control Flow, Arrays, Strings, Object-Oriented Programming (OOP) Basics, Methods, Basic Input/Output with Question and Options along with correct answer in JSON format, (Max 10)"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"questions\": [\n    {\n      \"question\": \"Which of the following is NOT a primitive data type in Java?\",\n      \"options\": [\n        \"int\",\n        \"boolean\",\n        \"String\",\n        \"float\"\n      ],\n      \"correctAnswer\": \"String\"\n    },\n    {\n      \"question\": \"What is the purpose of the 'if' statement in Java?\",\n      \"options\": [\n        \"To repeat a block of code\",\n        \"To define a class\",\n        \"To execute a block of code based on a condition\",\n        \"To declare a variable\"\n      ],\n      \"correctAnswer\": \"To execute a block of code based on a condition\"\n    },\n    {\n      \"question\": \"Which of the following operators is used for assignment in Java?\",\n      \"options\": [\n        \"==\",\n        \"=\",\n        \"+\",\n        \"%\"\n      ],\n      \"correctAnswer\": \"=\"\n    },\n    {\n      \"question\": \"What is the index of the first element in an array in Java?\",\n      \"options\": [\n        \"1\",\n        \"0\",\n        \"-1\",\n        \"The array's length\"\n      ],\n      \"correctAnswer\": \"0\"\n    },\n    {\n      \"question\": \"Which keyword is used to define a class in Java?\",\n      \"options\": [\n        \"public\",\n        \"class\",\n        \"static\",\n        \"void\"\n      ],\n      \"correctAnswer\": \"class\"\n    },\n    {\n      \"question\": \"What is encapsulation in OOP?\",\n      \"options\": [\n        \"Hiding data and methods within a class\",\n        \"Creating multiple objects from the same class\",\n        \"Inheriting properties from another class\",\n        \"Breaking down a problem into smaller parts\"\n      ],\n      \"correctAnswer\": \"Hiding data and methods within a class\"\n    },\n    {\n      \"question\": \"What is the purpose of the 'main' method in a Java program?\",\n      \"options\": [\n        \"To declare variables\",\n        \"To define a class\",\n        \"To start the execution of the program\",\n        \"To print output to the console\"\n      ],\n      \"correctAnswer\": \"To start the execution of the program\"\n    },\n    {\n      \"question\": \"Which of the following methods is used to read input from the console in Java?\",\n      \"options\": [\n        \"System.out.println()\",\n        \"System.in.read()\",\n        \"Scanner.nextLine()\",\n        \"print()\"\n      ],\n      \"correctAnswer\": \"Scanner.nextLine()\"\n    },\n    {\n      \"question\": \"Which loop is guaranteed to execute at least once?\",\n      \"options\": [\n        \"for loop\",\n        \"while loop\",\n        \"do-while loop\",\n        \"if-else loop\"\n      ],\n      \"correctAnswer\": \"do-while loop\"\n    },\n    {\n      \"question\": \"What does the 'new' keyword do in Java?\",\n      \"options\": [\n        \"Declares a variable\",\n        \"Creates a new object\",\n        \"Defines a class\",\n        \"Calls a method\"\n      ],\n      \"correctAnswer\": \"Creates a new object\"\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});



// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
