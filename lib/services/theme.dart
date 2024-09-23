import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:provider/provider.dart';

class GlobalTheme extends ChangeNotifier {
  bool _isDarkMode = false;

  bool get isDarkMode => _isDarkMode;

  Color get textColor => Colors.red;

  ColorScheme get colorScheme {
    return _isDarkMode
        ? const ColorScheme.dark(
            primary: Color(0xFF00ADB5),
            onPrimary: Color(0xFF393E46),
            secondary: Color(0xFF393E46),
            onSecondary: Color(0xFFEEEEEE),
            surface: Color(0xFF222831),
            onSurface: Color(0xFFEEEEEE),
            error: Color(0xFFFF3F3F),
            onError: Color(0xFFFFFFFF),
          )
        : const ColorScheme.light(
            primary: Color(0xFF3F72AF),
            onPrimary: Colors.white,
            secondary: Color(0xFF112D4E),
            onSecondary: Colors.white,
            surface: Color(0xFFF9F7F7),
            onSurface: Color(0xFF112D4E),
            error: Color(0xFFFF3F3F),
            onError: Colors.white,
          );
  }

  void init() {
    var brightness =
        SchedulerBinding.instance.platformDispatcher.platformBrightness;
    _isDarkMode = brightness == Brightness.dark;
    notifyListeners();
  }

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }
}

class ThemeToggleButton extends StatelessWidget {
  const ThemeToggleButton({super.key});

  @override
  Widget build(BuildContext context) {
    final themeNotifier = Provider.of<GlobalTheme>(context);

    return IconButton(
      icon: themeNotifier.isDarkMode
          ? const Icon(Icons.light_mode)
          : const Icon(Icons.dark_mode),
      onPressed: () {
        themeNotifier.toggleTheme();
      },
    );
  }
}
