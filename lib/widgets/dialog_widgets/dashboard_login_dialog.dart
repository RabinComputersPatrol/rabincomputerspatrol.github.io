// ignore_for_file: use_build_context_synchronously

import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:rabincomputerspatrol/pages/dashboard_page.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/services/theme.dart';
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

                        if (user != null) {
                          // Logged in successfully
                          if (mounted) {
                            Navigator.of(superContext).pushReplacement(
                                MaterialPageRoute(
                                    builder: (superContext) =>
                                        const DashboardPage()));
                          }
                        } else {
                          // Handle incorrect credentials
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              backgroundColor:
                                  Theme.of(context).dialogBackgroundColor,
                              content: Text(
                                'Invalid credentials',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: GlobalTheme.textColor,
                                ),
                              ),
                            ),
                          );
                        }
                      } catch (e) {
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
