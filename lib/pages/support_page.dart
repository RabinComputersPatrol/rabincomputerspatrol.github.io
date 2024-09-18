// Flutter imports:
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

// Project imports:
import 'package:rabincomputerspatrol/services/priority.dart';
import 'package:rabincomputerspatrol/services/text_formatter_builder.dart';
import 'package:rabincomputerspatrol/services/theme.dart';
import 'package:rabincomputerspatrol/widgets/dialog_widgets/dialog_text_input.dart';

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

  void handleSubmit() {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      // Submit form data logic
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
                    color: GlobalTheme.isDarkMode ? Colors.blueAccent : null,
                  ),
                ),
                const Flexible(
                    child: Text(
                  "Computer Problems Form",
                  textScaler: TextScaler.linear(1.5),
                ))
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
              label: 'Phone Number',
              keyboard: TextInputType.phone,
              formatter: TextInputFormatter.withFunction((oldValue, newValue) {
                return TextEditingValue(
                  text: formatPhoneNumber(newValue.text),
                  selection: newValue.selection,
                );
              }),
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
                    color: _priority.color, fontWeight: FontWeight.bold),
                initialSelection: _priority,
                dropdownMenuEntries: [
                  DropdownMenuEntry(
                      value: Priorities.veryErgent, label: ('דחוף מאוד')),
                  DropdownMenuEntry(value: Priorities.ergent, label: ('דחוף')),
                  DropdownMenuEntry(
                      value: Priorities.important, label: ('חשוב')),
                  DropdownMenuEntry(value: Priorities.normal, label: ('רגיל')),
                  DropdownMenuEntry(
                      value: Priorities.nonErgent, label: ('לא דחוף')),
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
            DialogTextInput(
              textEditingController: _problemDescriptionController,
              label: 'Problem Description',
              keyboard: TextInputType.multiline,
              onSubmit: (value) {
                if (value.isEmpty) {
                  // Show error if necessary
                }
              },
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
    );
  }
}
