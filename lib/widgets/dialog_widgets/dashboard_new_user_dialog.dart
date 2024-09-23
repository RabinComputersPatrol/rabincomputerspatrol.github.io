// Flutter imports:
import 'dart:collection';
import 'package:flutter/material.dart';

// Project imports:
import 'package:rabincomputerspatrol/pages/dashboard_page.dart';
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dialog_text_input.dart';

class DashboardAddUserDialog extends StatefulWidget {
  const DashboardAddUserDialog({super.key});

  @override
  State<DashboardAddUserDialog> createState() => _DashboardAddUserDialogState();
}

class _DashboardAddUserDialogState extends State<DashboardAddUserDialog> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  int? _selectedPermission;
  bool _isLoading = false; // Loading state

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      content: SizedBox(
        width: 400,
        height: 300, // Adjust height to fit the UI
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
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
            if (!_isLoading)
              DropdownButtonFormField<int>(
                decoration: const InputDecoration(
                  labelText: "Select Permission Level",
                  border: OutlineInputBorder(),
                ),
                value: _selectedPermission,
                items: const [
                  DropdownMenuItem(value: 5, child: Text('מנהל מערכת')),
                  DropdownMenuItem(value: 4, child: Text('אחראי מחשבים')),
                  DropdownMenuItem(value: 3, child: Text('3')), // TODO: Get Names
                  DropdownMenuItem(value: 2, child: Text('2')),
                  DropdownMenuItem(value: 1, child: Text('1')),
                ],
                onChanged: (value) {
                  setState(() {
                    _selectedPermission = value;
                  });
                },
              ),
            _isLoading
                ? const CircularProgressIndicator() // Show loader if loading
                : TextButton(
              onPressed: () async {
                if (_usernameController.text.isEmpty || _passwordController.text.isEmpty || _selectedPermission == null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Please fill in all fields'),
                    ),
                  );
                  return;
                }

                setState(() {
                  _isLoading = true; // Start loading
                });

                try {
                  Map<String, Object> userData = HashMap<String, Object>();
                  String name = _usernameController.text;
                  String password = _passwordController.text;

                  userData.putIfAbsent("name", () => name);
                  userData.putIfAbsent("password", () => password);
                  userData.putIfAbsent("permission", () => _selectedPermission!);

                  await DatabaseAPI.instance.addDocument("users", name, userData);

                  // Navigate to DashboardPage after adding the user
                  if (mounted) {
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(
                        builder: (context) => const DashboardPage(),
                      ),
                    );
                  }
                } catch (e) {
                  // Handle any error during the async operation
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Error occurred while adding user'),
                    ),
                  );
                } finally {
                  setState(() {
                    _isLoading = false; // Stop loading
                  });
                }
              },
              child: const Text("Add"),
            ),
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
