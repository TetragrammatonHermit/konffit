;;; custom --- packages
;;; Commentary:
;; Load packages
;;; Code:

;; Prelude modules
(require 'prelude-c)
(require 'prelude-common-lisp)
(require 'prelude-css)
(require 'prelude-emacs-lisp)
(require 'prelude-erc)
;;(require 'prelude-haskell)
(require 'prelude-js)
(require 'prelude-key-chord)
(require 'prelude-latex)
(require 'prelude-lisp)
(require 'prelude-perl)
(require 'prelude-python)
(require 'prelude-scheme)
(require 'prelude-xml)

;; Elpa packages
(require 'package)
(add-to-list 'package-archives
             '("marmalade" .
               "http://marmalade-repo.org/packages/"))
(package-initialize)

(prelude-require-packages '(

                            key-chord
                            writeroom-mode
                            dired-details
                            multiple-cursors
                            iy-go-to-char
                            htmlize
                            ; ;ido-better-flex
                            ; htmlize
                            google-translate
                            ; gnuplot-mode
                            window-numbering
                            ; ;;guide-key
                            ; visual-regexp
                            ; visual-regexp-steroids
                            flycheck
                            icicles
                            lacarte
                            fuzzy-match
                            ;smex
                                        ;autocomplete-mode
                            auto-complete
                            ac-emmet
                            ac-js2

                            ; Sync Google Calendar TODO
                            ;request
                            ;gntp
                            ;org-gcal
                                        ; yasnippet
                            yasnippet
                            angular-snippets
                                        ; language modes
                            elpy
                            jedi
                            ;tracwiki-mode
                            ;; todo: not working arduino-mode
                            ;; ac-slime
                            ;;sclang-extensions
                            ;;sclang-snippets
                            
                            csharp-mode
                            applescript-mode
                                        ; haskell
                            flycheck-hdevtools
                            haskell-mode
                                        ;ghci-completion
                                        ;web
                            emmet-mode
                            js2-mode
                            ac-js2
                            js2-refactor
                            web-beautify
                            skewer-mode

                                        ;scad-mode
                            ))

;;; emacs-packages.el ends here
