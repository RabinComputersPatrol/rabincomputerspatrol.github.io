// Flutter imports:
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:rabincomputerspatrol/pages/dashboard_page.dart';
import 'package:rabincomputerspatrol/services/api/verify_session.dart';
// Project imports:
import 'package:rabincomputerspatrol/services/firebase/firebase_api.dart';
import 'package:rabincomputerspatrol/services/priority.dart';
import 'package:rabincomputerspatrol/services/text_formatter_builder.dart';
import 'package:rabincomputerspatrol/services/theme.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dashboard_login_dialog.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dialog_text_input.dart';

// Package imports:

// Utility functions for formatting phone and room numbers
String formatPhoneNumber(String phoneNumber) {
  // Your phone number formatting logic here
  return phoneNumber;
}

String formatRoomNumber(String roomNumber) {
  // Your room number formatting logic here
  return roomNumber;
}

class SupportPage extends StatefulWidget {
  const SupportPage({super.key});

  @override
  State<SupportPage> createState() => _SupportPageState();
}

class _SupportPageState extends State<SupportPage> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController _roomNumberController = TextEditingController();
  final TextEditingController _phoneNumberController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _problemDescriptionController =
      TextEditingController();

  Priority _priority = Priorities.normal;

  void handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      DateTime time = DateTime.now();

      await DatabaseAPI.instance.uploadJson(
        {
          "date": "${time.day}/${time.month}/${time.year}",
          "time": "${time.hour}:${time.minute}:${time.millisecond}",
          "fixed": false,
          "name": _nameController.text,
          "phoneNumber": _phoneNumberController.text,
          "roomNumber": int.tryParse(_roomNumberController.text) ?? -1,
          "priority": _priority.value,
          "problemDescription": _problemDescriptionController.text,
        },
        "reports",
        "${_roomNumberController.text}_${time.hour}:${time.minute}:${time.millisecond}_${time.year}:${time.month}:${time.day}",
      );

      resetFields();
    }
  }

  @override
  void dispose() {
    _roomNumberController.dispose();
    _phoneNumberController.dispose();
    _nameController.dispose();
    _problemDescriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final GlobalTheme theme = Provider.of<GlobalTheme>(context);
    final double screenWidth = MediaQuery.of(context).size.width;
    final double screenHeight = MediaQuery.of(context).size.height;

    return Scaffold(
      body: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Flexible(
                  child: Image(
                    image: const AssetImage("assets/rabin-logo.png"),
                    color: theme.isDarkMode ? Colors.blueAccent.shade400 : null,
                  ),
                ),
                const Flexible(
                    child: Text(
                  "Computer Problems Form",
                  textScaler: TextScaler.linear(1.5),
                )),
                const ThemeToggleButton(),
              ],
            ),
            const SizedBox(height: 5),
            // Room number field
            DialogTextInput(
              textEditingController: _roomNumberController,
              label: 'Room Number',
              keyboard: TextInputType.number,
              formatter: TextFormatterBuilder.integerTextFormatter(),
              onSubmit: (value) {
                if (value.isEmpty) {
                  // Show error if necessary
                }
              },
            ),
            const SizedBox(height: 5),
            // Phone number field
            DialogTextInput(
              textEditingController: _phoneNumberController,
              label: 'Phone Number (e.g 054-000-0000)',
              keyboard: TextInputType.phone,
              formatter: TextFormatterBuilder.integerTextFormatter(),
              onSubmit: (value) {
                if (value.isEmpty ||
                    !RegExp(r'^\d{3}-\d{3}-\d{4}$').hasMatch(value)) {
                  // Show error if necessary
                }
              },
            ),
            const SizedBox(height: 5),
            // Name field
            DialogTextInput(
              textEditingController: _nameController,
              label: 'Name',
              onSubmit: (value) {
                if (value.isEmpty) {
                  // Show error if necessary
                }
              },
            ),
            const SizedBox(height: 5),
            // Priority dropdown
            const Text('דחיפות:', style: TextStyle(fontSize: 16)),
            Flexible(
              child: DropdownMenu<Priority>(
                textStyle: TextStyle(
                    color: _priority.color,
                    fontWeight: FontWeight.bold,
                    fontFamily: "Heebo"),
                initialSelection: _priority,
                dropdownMenuEntries: [
                  DropdownMenuEntry(
                      value: Priorities.veryUrgent, label: ('דחוף מאוד')),
                  DropdownMenuEntry(value: Priorities.urgent, label: ('דחוף')),
                  DropdownMenuEntry(
                      value: Priorities.important, label: ('חשוב')),
                  DropdownMenuEntry(value: Priorities.normal, label: ('רגיל')),
                  DropdownMenuEntry(
                      value: Priorities.nonUrgent, label: ('לא דחוף')),
                ],
                onSelected: (Priority? newValue) {
                  setState(() {
                    _priority = newValue ?? Priorities.normal;
                  });
                },
              ),
            ),
            const SizedBox(height: 5),
            // Problem description field
            Container(
              width: screenWidth * 0.5,
              child: DialogTextInput(
                textEditingController: _problemDescriptionController,
                label: 'תיאור בעיה',
                keyboard: TextInputType.multiline,
                allowEmptySubmission: false,
                minLines: 10,
                maxLines: null,
                textDirection: TextDirection.rtl,
                labelBehavior: FloatingLabelBehavior.auto,
                labelAlignment: FloatingLabelAlignment.start,
                onSubmit: (value) {
                  if (value.isEmpty) {
                    // Show error if necessary
                  }
                },
              ),
            ),
            const SizedBox(height: 5),
            // Submit button
            ElevatedButton(
              onPressed: handleSubmit,
              child: const Text('אישור'),
            ),
          ],
        ),
      ),
      persistentFooterButtons: [
        TextButton(
          onPressed: () async {
            VerifySession sessionVerifier = VerifySession();
            bool isValidSession = await sessionVerifier.verifySession(context);

            if (isValidSession) {
              // Use push instead of pushReplacement to maintain the back stack
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const DashboardPage()),
              );
            } else {
              // Show the login dialog if the session is not valid
              showDialog(
                context: context,
                builder: (context) => DashboardLoginDialog(superContext: context),
              ).then((_) {
                // Re-verify session after the dialog is closed
                sessionVerifier.verifySession(context).then((isValidSession) {
                  if (isValidSession) {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => const DashboardPage()),
                    );
                  }
                });
              });
            }
          },
          child: const Text("© 2024 All rights reserved."),
        )
      ],
    );
  }

  void resetFields() {
    setState(() {
      _nameController.text = "";
      _phoneNumberController.text = "";
      _roomNumberController.text = "";
      _problemDescriptionController.text = "";
      _priority = Priorities.normal;
    });
  }
}
