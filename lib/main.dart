import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:rabincomputerspatrol/pages/support_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    var brightness =
        SchedulerBinding.instance.platformDispatcher.platformBrightness;

    bool isDarkMode = brightness == Brightness.dark;
    Color primaryColor = isDarkMode ? Colors.black : Colors.white;

    return MaterialApp(
      title: 'Computer Problems',
      theme: ThemeData(
        primaryColor: primaryColor,
        useMaterial3: true,
      ),
      debugShowCheckedModeBanner: false,
      home: const SupportPage(),
    );
  }
}
