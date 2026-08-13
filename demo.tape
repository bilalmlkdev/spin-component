# Demo recording script for VHS (https://github.com/charmbracelet/vhs)
#
# Install:
#   brew install vhs          (macOS)
#   or see https://github.com/charmbracelet/vhs#installation for Linux
#
# Record:
#   cd ~/Desktop/spin-component
#   vhs demo.tape
#
# This produces demo.gif in the current directory — drop it at the top of
# README.md right under the title.

Output demo.gif

Set FontSize 18
Set Width 900
Set Height 500
Set Theme "Dracula"
Set TypingSpeed 60ms

Type "cd ~/Desktop/test-project"
Enter
Sleep 500ms

# Uses the locally-linked command (after `npm link` in the spin-component
# folder) since this repo isn't published to npm yet. Once it is, swap this
# line for: Type "npx spin-component Button"
Type "spin-component Button"
Enter
Sleep 3s

Type "ls src/components/Button"
Enter
Sleep 2s

Type "cat src/components/Button/Button.tsx"
Enter
Sleep 3s
