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
(require 'prelude-org)
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

                                        ; currently disabled: scad-mode
(prelude-require-packages '(elpy
                                        ;general
                            key-chord
                            ecb
                            
                            dired-details
                            multiple-cursors
                            iy-go-to-char
                            ;ido-better-flex
                            slime
                            htmlize
                            google-translate
                            gnuplot-mode
                            window-numbering
                            guide-key
                            visual-regexp
                            visual-regexp-steroids
                            monokai-theme
                            solarized-theme
                            flycheck
                                        ;icicles ;(flexible buffer autocomplete)
                            smex
                                        ;autocomplete-mode
                            auto-complete
                            ac-slime
                            ac-emmet
                            ac-js2
                            ;; Sync Google Calendar
                            request
                            gntp
                            org-gcal
                                        ; yasnippet
                            yasnippet
                            angular-snippets
                                        ; language modes
                            tracwiki-mode
                            arduino-mode
                            sclang-extensions
                            sclang-snippets
                            csharp-mode
                            applescript-mode
                                        ; haskell
                            flycheck-hdevtools
                            haskell-mode
                         ;   ghci-completion
                                        ;web
                            emmet-mode
                            js3-mode
                            js2-mode
                            js2-refactor
                            web-beautify
                            skewer-mode
                            ))

;;; emacs-packages.el ends here
