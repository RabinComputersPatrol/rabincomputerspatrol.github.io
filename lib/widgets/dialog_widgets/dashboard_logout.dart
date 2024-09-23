import 'package:flutter/material.dart';
import 'package:rabincomputerspatrol/pages/support_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DashboardLogout extends StatelessWidget {
  const DashboardLogout({super.key});

  Future<void> _logout(BuildContext context) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    await prefs.remove('name');
    await prefs.remove('password');
    await prefs.remove('permission');

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Logged out successfully.'),
      ),
    );

    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const SupportPage()),
          (Route<dynamic> route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () => _logout(context),
      tooltip: 'Logout',
      child: const Icon(Icons.logout),
    );
  }
}
