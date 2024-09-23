// ignore_for_file: use_build_context_synchronously

// Flutter imports:
import 'package:flutter/material.dart';

// Package imports:
import 'package:collection/collection.dart';
// import 'package:shared_preferences/shared_preferences.dart';

// Project imports:
import 'package:rabincomputerspatrol/pages/dashboard_page.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dialog_text_input.dart';

class DashboardLoginDialog extends StatefulWidget {
  final BuildContext superContext;
  const DashboardLoginDialog({super.key, required this.superContext});

  @override
  State<DashboardLoginDialog> createState() =>
      // ignore: no_logic_in_create_state
      _DashboardLoginDialogState(superContext: superContext);
}

class _DashboardLoginDialogState extends State<DashboardLoginDialog> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final BuildContext superContext;
  bool _isLoading = false; // Loading state

  _DashboardLoginDialogState({required this.superContext});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      content: SizedBox(
        width: 400,
        height: 200,
        child: Column(
          children: [
            if (!_isLoading)
              DialogTextInput(
                onSubmit: (value) {},
                label: "Username",
                textEditingController: _usernameController,
              ),
            if (!_isLoading)
              DialogTextInput(
                onSubmit: (value) {},
                label: "Password",
                obscureText: true,
                textEditingController: _passwordController,
              ),
            const SizedBox(height: 10),
            _isLoading // Check if it's loading
                ? const CircularProgressIndicator() // Show loader if loading
                : TextButton(
                    onPressed: () async {
                      setState(() {
                        _isLoading = true; // Start loading
                      });
                      try {
                        List<Map<String, dynamic>> users =
                            await DatabaseAPI.instance.getAllDocuments("users");

                        Map<String, dynamic>? user = users.firstWhereOrNull(
                            (user) =>
                                user["name"] == _usernameController.text &&
                                user["password"] == _passwordController.text);

                        // Logged in successfully
                        if (user != null) {
                          // SharedPreferences prefs =
                          //     await SharedPreferences.getInstance();
                          // await prefs.setString('name', user["name"]);
                          // await prefs.setString('password', user["password"]);
                          // await prefs.setInt('permission', user["permission"]);
                        }

                        if (mounted) {
                          Navigator.of(superContext).pushReplacement(
                              MaterialPageRoute(
                                  builder: (superContext) =>
                                      const DashboardPage()));
                        }
                      } catch (e) {
                        print(e);
                        // Handle any error during the async operation
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Text('Error occurred during login'),
                          ),
                        );
                      } finally {
                        setState(() {
                          _isLoading = false; // Stop loading
                        });
                      }
                    },
                    child: const Text("Submit"),
                  )
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text("Close"),
        )
      ],
    );
  }
}
