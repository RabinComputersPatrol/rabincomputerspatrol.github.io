// Flutter imports:
import 'package:flutter/material.dart';

class DialogToggleSwitch extends StatefulWidget {
  final Function(bool value) onToggle;
  final bool initialValue;
  final String? label;
  final TextScaler textScaler;

  const DialogToggleSwitch({
    super.key,
    this.initialValue = false,
    this.label,
    this.textScaler = const TextScaler.linear(1.0),
    required this.onToggle,
  });

  @override
  State<DialogToggleSwitch> createState() => _DialogToggleSwitchState();
}

class _DialogToggleSwitchState extends State<DialogToggleSwitch> {
  late bool value;

  @override
  void initState() {
    super.initState();

    value = widget.initialValue;
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4.0),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 4.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          border: Border.all(color: Theme.of(context).colorScheme.outline),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Text(
              widget.label ?? '',
              textAlign: TextAlign.center,
              textScaler: widget.textScaler,
            ),
            const SizedBox(width: 3),
            Switch(
              onChanged: (value) {
                widget.onToggle.call(value);

                setState(() => this.value = value);
              },
              value: value,
            ),
          ],
        ),
      ),
    );
  }
}
