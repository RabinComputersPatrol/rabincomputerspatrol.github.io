// Flutter imports:
import 'package:flutter/material.dart';

// Package imports:
import 'package:provider/provider.dart';

// Project imports:
import 'package:rabincomputerspatrol/pages/support_page.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/services/theme.dart';

class ComputerPatrol extends StatelessWidget {
  const ComputerPatrol({super.key});

  Future<void> _initializeApp() async {
    await DatabaseAPI.instance.initialize();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
      future: _initializeApp(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

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

        return ChangeNotifierProvider(
          create: (context) {
            final theme = GlobalTheme();
            theme.init(); // Initialize theme
            return theme;
          },
          child: Consumer<GlobalTheme>(
            builder: (context, theme, child) {
              return MaterialApp(
                title: 'Computer Problems',
                theme: ThemeData(
                  colorScheme: theme.colorScheme,
                ),
                debugShowCheckedModeBanner: false,
                home: const SupportPage(),
              );
            },
          ),
        );
      },
    );
  }
}
