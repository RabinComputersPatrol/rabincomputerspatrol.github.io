// Flutter imports:
import 'package:flutter/material.dart';

// Project imports:
import 'package:rabincomputerspatrol/pages/support_page.dart';
import 'package:rabincomputerspatrol/services/theme.dart';

class ComputerPatrol extends StatelessWidget {
  const ComputerPatrol({super.key});

  @override
  Widget build(BuildContext context) {
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
  }
}
