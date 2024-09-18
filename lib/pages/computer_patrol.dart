// Flutter imports:
import 'package:flutter/material.dart';

// Project imports:
import 'package:rabincomputerspatrol/pages/support_page.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/services/theme.dart';

class ComputerPatrol extends StatelessWidget {
  const ComputerPatrol({super.key});

  Future<void> _initializeApp() async {
    GlobalTheme.init();
    await DatabaseAPI.instance.initialize();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: _initializeApp(),
      builder: (context, snapshot) {
        // While waiting for the future, show a loading indicator
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        // If there's an error during initialization
        if (snapshot.hasError) {
          return MaterialApp(
            title: 'Computer Problems',
            theme: ThemeData(
              primaryColor: Colors.red,
              useMaterial3: true,
              brightness: Brightness.light,
            ),
            home: const Scaffold(
                body: Center(child: Text('Error initializing app'))),
            debugShowCheckedModeBanner: false,
          );
        }

        var (primaryColor, isDarkMode) = GlobalTheme.init();

        return MaterialApp(
          title: 'Computer Problems',
          theme: ThemeData(
            primaryColor: primaryColor,
            useMaterial3: true,
            brightness: isDarkMode ? Brightness.dark : Brightness.light,
          ),
          debugShowCheckedModeBanner: false,
          home: const SupportPage(),
        );
      },
    );
  }
}
