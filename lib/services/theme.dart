import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

class GlobalTheme {
  static bool _isDarkMode = false;
  static Color _primaryColor = Colors.white;

  static get primaryColor => _primaryColor;
  static get isDarkMode => _isDarkMode;
  static get textColor => _isDarkMode ? Colors.white : Colors.black;

  static (Color, bool) init() {
    var brightness =
        SchedulerBinding.instance.platformDispatcher.platformBrightness;

    _isDarkMode = brightness == Brightness.dark;
    _primaryColor = isDarkMode ? Colors.black : Colors.white;

    return (_primaryColor, _isDarkMode);
  }
}
