// Flutter imports:
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DialogTextInput extends StatefulWidget {
  final Function(String value) onSubmit;
  final Function(String? value)? onChanged;
  final TextInputFormatter? formatter;
  final String? label;
  final String? initialText;
  final bool allowEmptySubmission;
  final bool enabled;
  final bool obscureText;
  final TextInputType keyboard;
  final TextEditingController? textEditingController;
  final Widget? suffixIcon;

  const DialogTextInput({
    super.key,
    required this.onSubmit,
    this.label,
    this.initialText,
    this.allowEmptySubmission = false,
    this.enabled = true,
    this.formatter,
    this.textEditingController,
    this.keyboard = TextInputType.text,
    this.onChanged,
    this.obscureText = false,
    this.suffixIcon,
  });

  @override
  State<DialogTextInput> createState() => _DialogTextInputState();
}

class _DialogTextInputState extends State<DialogTextInput> {
  bool focused = false;

  late final TextEditingController textEditingController =
      widget.textEditingController ??
          TextEditingController(text: widget.initialText);

  @override
  void didUpdateWidget(DialogTextInput oldWidget) {
    if (widget.initialText != null) {
      textEditingController.text = widget.initialText!;
    }
    super.didUpdateWidget(oldWidget);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(4.0),
      child: Focus(
        onFocusChange: (value) {
          if (focused && !value) {
            String textValue = textEditingController.text;
            if (textValue.isNotEmpty || widget.allowEmptySubmission) {
              widget.onSubmit.call(textValue);
            }
          }
          focused = value;
        },
        child: TextField(
            obscureText: widget.obscureText,
            enabled: widget.enabled,
            onSubmitted: (value) {
              if (value.isNotEmpty || widget.allowEmptySubmission) {
                widget.onSubmit.call(value);
                focused = false;
              }
            },
            onChanged: widget.onChanged?.call,
            onTapOutside: (_) {
              if (!focused) {
                return;
              }
              FocusManager.instance.primaryFocus?.unfocus();
            },
            controller: textEditingController,
            inputFormatters:
                (widget.formatter != null) ? [widget.formatter!] : null,
            decoration: InputDecoration(
              contentPadding: const EdgeInsets.fromLTRB(8, 4, 8, 4),
              labelText: widget.label,
              border:
                  OutlineInputBorder(borderRadius: BorderRadius.circular(4)),
              suffixIcon: widget.suffixIcon,
            ),
            keyboardType: widget.keyboard),
      ),
    );
  }
}
