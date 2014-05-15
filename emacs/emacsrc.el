;;; custom --- config
;;; Commentary:
;; This is a bad example of an Emacs configuration file.
;; I haven't had time to structure and comment it properly.
;;; Code:


;; Start daemon at start TODO: run this on system startup throught systemd etc
(load "server")
(unless (server-running-p) (server-start))

;; Edit server
(require 'edit-server)
(edit-server-start)

;; Magit use current window
(set-variable 'magit-emacsclient-executable "/usr/bin/emacsclient")

;; Theming

(set-face-attribute 'default nil :font "Droid Sans Mono-10")
                                        
(disable-theme 'zenburn) ;; Disable prelude default theme and other behaviour
(setq prelude-flyspell nil)
(setq prelude-guru nil)
(setq prelude-whitespace nil)

(load-theme 'monokai)

(set-default 'cursor-type 'bar)
(set-cursor-color "white")

;; Keybindings for day/night themes
(global-set-key [H-end] '(lambda () (interactive)
                           (disable-theme 'solarized-light)
                           (disable-theme 'solarized-dark)
                           (load-theme 'monokai)
                           (set-cursor-color "white")))
(global-set-key [H-home] '(lambda () (interactive)
                            (disable-theme 'monokai)
                            (load-theme 'solarized-light)
                            (set-cursor-color "black")))

(defun transparency (value)
  "Set the transparency of the frame window.  VALUE = 0-100."
  (interactive "nTransparency Value 0 - 100 opaque:")
  (set-frame-parameter (selected-frame) 'alpha value))

(transparency 96)

(defun buffer-face-variable-width () ;;TODO: call on writeroom hook
  "Set a non fixed width font in current buffer."
  (interactive)
  (setq buffer-face-mode-face '(:family "Droid Sans") )
  (buffer-face-mode))
(defun buffer-face-monospaced ()
  "Set a non fixed width font in current buffer."
  (interactive)
  (setq buffer-face-mode-face '(:family "Droid Sans Mono") )
  (buffer-face-mode))

;; Disable scroll bars
(scroll-bar-mode -1)

(x-focus-frame nil)

;; Change frames like chromium tabs
(window-numbering-mode t)

;; Disable bleep at fail
(setq ring-bell-function 'ignore)

(defalias 'yes-or-no-p 'y-or-n-p)

;; Make OSX special characters work with alt, set cmd to meta.
(setq mac-option-modifier 'nil
      mac-command-modifier 'meta
      x-select-enable-clipboard t)

;; Nicer mousewheel scrolling
(setq mouse-wheel-scroll-amount '(1 ((shift) . 1) ((control) . nil)))
(setq mouse-wheel-progressive-speed nil)

; Make scratch-buffer more convenient
(setq initial-scratch-message "")
(setq initial-major-mode 'org-mode)

;; Default to UTF-8
(set-language-environment "UTF-8")

;; Setup emerge as mergetool
(setq emerge-diff-options "--ignore-all-space")

;; Use Chromium as 'default' browser
(setq browse-url-browser-function 'browse-url-generic
      browse-url-generic-program "x-www-browser")

;; Use conkeror as default browser
;;(setq browse-url-generic-program (executable-find "conkeror"))
;;(setq browse-url-browser-function 'browse-url-generic)

(smartparens-global-mode +1)

(require 'google-translate)
(require 'google-translate-default-ui)
(global-set-key (kbd "C-x t") 'google-translate-at-point)
(global-set-key (kbd "C-x T") 'google-translate-at-point-reverse)
(setq google-translate-enable-ido-completion 't) ;;todo
(setq google-translate-show-phonetic 't)
(setq google-translate-default-target-language '"en")
(setq google-translate-default-source-language '"fi")
(set-face-attribute 'google-translate-translation-face nil :height 2)


;; Minibuffer autocompletition with ido-mode and smex
;; http://www.masteringemacs.org/articles/2010/10/10/introduction-to-ido-mode/
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)
(setq ido-use-filename-at-point 'guess)
(ido-mode t)
(setq ido-file-extensions-order '(".org" ".tex"))


;;; Ido replacement
;; (require 'icicles)
;; (icy-mode 1)

;; (require 'lacarte)
;; (global-set-key [menu] 'lacarte-execute-command)
;; (global-set-key [?\M-`] 'lacarte-execute-command) ;replace orig. command
;; (require 'fuzzy-match)
;;;


(global-set-key (kbd "M-§") 'other-frame)

(global-set-key (kbd "M-x") nil)
(global-set-key (kbd "M-x") 'smex)  ;; Fuzzy command autocomplete

(key-chord-mode 1) 
;; Unmap dumb Prelude keybindings
(key-chord-define-global "uu" nil)
(key-chord-define-global "yy" nil)

(key-chord-define-global "jf" 'ace-jump-word-mode)
(key-chord-define-global "öa" 'ace-jump-char-mode)
(setq ace-jump-mode-scope 'frame) ;; Jump only inside current frame
(setq ace-jump-mode-case-fold 'nil) ;; Case sensitived

;;TODO ace-jump-mode-pop-mark
;;TODO ace-jump-enable-mark-sync

;; 
;; enable a more powerful jump back function from ace jump modef
;;
(autoload
  'ace-jump-mode-pop-mark
  "ace-jump-mode"
  "Ace jump back:-)"
  t)
(eval-after-load "ace-jump-mode"
  '(ace-jump-mode-enable-mark-sync))

;; (eval-after-load "ace-jump-mode"
;;   '(add-to-list 'mc/cursor-specific-vars 'iy-go-to-char-start-pos)
;; )

(define-key global-map (kbd "C-x SPC") 'ace-jump-mode-pop-mark)

(require 'iy-go-to-char)
(key-chord-define-global "jj" 'iy-go-to-char)
(key-chord-define-global "hh" 'iy-go-to-char-backward)
(global-set-key (kbd "C-c .") 'iy-go-to-or-up-to-continue)
(global-set-key (kbd "C-c ,") 'iy-go-to-or-up-to-continue-backward)
(setq iy-go-to-char-kill-ring-save t)


(key-chord-define-global "kd" 'mc/edit-lines)

(global-set-key (kbd "C-c c") 'comment-or-uncomment-region)
(global-set-key (kbd "C-c SPC") 'er/expand-region)
;; Multiple cursors
(key-chord-define-global "jn" 'mc/mark-more-like-this-extended)
(key-chord-define-global "jt" 'mc/mark-sgml-tag-pair)
(global-unset-key (kbd "M-<down-mouse-1>"))
(global-set-key (kbd "M-<mouse-1>") 'mc/add-cursor-on-click)
(global-set-key (kbd "H-<mouse-1>") 'mc/add-cursor-on-click)

;; to transpose words backwards without having to type the negative argument
;; (global-set-key (kbd "M-T") "C-u\ -1\ \M-t")



;; Pop marks faster with just space
(setq set-mark-command-repeat-pop 't)

;; Autocomplete

;;(global-auto-complete-mode t)
;;(add-to-list 'ac-dictionary-directories "~/notes/ac-dict") 

(require 'auto-complete-config)
(ac-config-default)
(setq ac-menu-height 9)
(setq ac-source-yasnippet nil)

(setq ac-auto-start 2)
(setq ac-ignore-case nil)

;; Change yasnippet binding
(require 'yasnippet)
(yas-global-mode t)
(define-key yas-minor-mode-map (kbd "<tab>") nil)
(define-key yas-minor-mode-map (kbd "TAB") nil)
(define-key yas-minor-mode-map (kbd "C-<tab>") 'yas-expand)
(setq yas-prompt-functions '(yas-ido-prompt))

;; Add custom snippets
(setq yas-snippet-dirs (append yas-snippet-dirs
                               '("~/konffit/emacs/yasnippets")))

;; Set projectile to create a cache 
(setq projectile-enable-require 'projectile)
(setq projectile-enable-caching t)
;; ignore svn projects
(setq projectile-globally-ignored-directories (append '(".svn") projectile-globally-ignored-directories))
(setq projectile-globally-ignored-files (append '("*.svn-base" "*.o" "*.pyc") projectile-globally-ignored-files))
(setq projectile-use-native-indexing t)
(projectile-global-mode)

;; Acme-like mouse right-click search
(global-set-key [(mouse-3)] 'acme-search-forward)
(global-set-key [(shift mouse-3)] 'acme-search-backward)

;; Visual regexp
(define-key global-map (kbd "C-c C-r") 'vr/replace)
(define-key global-map (kbd "C-c C-q") 'vr/query-replace)
(define-key global-map (kbd "C-c m") 'vr/mc-mark)


;; Copy current buffer path to clipboard
(define-key prelude-mode-map (kbd "C-c w") 'prelude-copy-file-name-to-clipboard)

;;; Dired
;; allow dired to be able to delete or copy a whole dir.
(setq dired-recursive-copies (quote always)) ; “always” means no asking
(setq dired-recursive-deletes (quote top)) ; “top” means ask once

;; Use split window as default copy/rename target
;; Works nicely with tramp as a sftp file manager.
(setq dired-dwim-target t)

(require 'dired-details)
(dired-details-install)
(setq-default dired-details-hidden-string "")

(defun dired-open-thunar ()
  "Path file from dired buffer with thunar."
  (interactive)
  (let ((file-name (dired-get-file-for-visit)))
    (if (file-exists-p file-name)
        (call-process "/usr/bin/thunar" nil 0 nil file-name))))

(defun dired-open-in-external-app ()
  "Open the current file or dired marked files in external app."
  (interactive)
  (let ( doIt
         (myFileList
          (cond
           ((string-equal major-mode "dired-mode") (dired-get-marked-files))
           (t (list (buffer-file-name))) ) ) )

    (setq doIt (if (<= (length myFileList) 5)
                   t
                 (y-or-n-p "Open more than 5 files?") ) )

    (when doIt
      (cond
       ((string-equal system-type "windows-nt")
        (mapc (lambda (fPath) (w32-shell-execute "open" (replace-regexp-in-string "/" "\\" fPath t t)) ) myFileList)
        )
       ((string-equal system-type "darwin")
        (mapc (lambda (fPath) (shell-command (format "open \"%s\"" fPath)) )  myFileList) )
       ((string-equal system-type "gnu/linux")
        (mapc (lambda (fPath) (let ((process-connection-type nil)) (start-process "" nil "xdg-open" fPath)) ) myFileList) ) ) ) ) )

(add-hook 'dired-mode-hook
          '(lambda ()
             (define-key dired-mode-map "o" 'dired-open-in-external-app)))




;; {{ copy the file-name/full-path in dired buffer into clipboard
;; `w` => copy file name
;; `C-u 0 w` => copy full path
(defadvice dired-copy-filename-as-kill (after dired-filename-to-clipboard activate)
  (with-temp-buffer
    (insert (current-kill 0))
    (shell-command-on-region (point-min) (point-max)
                             (cond
                              ((eq system-type 'cygwin) "putclip")
                              ((eq system-type 'darwin) "pbcopy")
                              (t "xsel -ib")
                              )))
  (message "%s copied to clipboard" (current-kill 0))
  )


(global-flycheck-mode t)


;; Add week numbers to calendar
(copy-face font-lock-constant-face 'calendar-iso-week-face)
(set-face-attribute 'calendar-iso-week-face nil
                    :height 0.7)
(setq calendar-intermonth-text
      '(propertize
        (format "%2d"
                (car
                 (calendar-iso-from-absolute
                  (calendar-absolute-from-gregorian (list month day year)))))
        'font-lock-face 'calendar-iso-week-face))

;; Set week to start on monday
(setq calendar-week-start-day 1)


;;; Email
;;(load-file "~/.wl")
;; (autoload 'wl "wl" "Wanderlust" t)
;; (autoload 'wl-other-frame "wl" "Wanderlust on new frame." t)
;; (autoload 'wl-draft "wl-draft" "Write draft with Wanderlust." t)


;;; Org-mode



(global-set-key (kbd "H-c") 'org-capture)
(global-set-key (kbd "H-a") 'org-agenda)


;;(global-set-key "\C-c\C-cl" 'org-store-link)
;;(global-set-key "\C-c\C-cb " 'org-iswitchb)

(setq org-default-notes-file  "~/notes/todo.org")

(setq org-catch-invisible-edits 'show)

(setq org-capture-templates
      '(("t" "Task / Chore" entry (file+headline "~/notes/todo.org" "Tasks")
         "* TODO %?\n  %i\n")
        ("w" "Shout to Twitter / Blog" entry (file+headline "~/notes/todo.org" "Shouts")
         "* TODO %?\n  %i\n")
        ("i" "Idea" entry (file+headline "~/notes/todo.org" "Ideas")
         "* %?\n  %i\n")
        ("u" "Usuko task" entry (file+headline "~/notes/usuko.org" "Tasks / Todo")
         "* TODO %?\n  %i\n ")
        ("o" "Tweaks to OS" entry (file+headline "~/notes/todo.org" "OS Tweak") "* %?\n  %i\n")
        ("b" "Buy" entry (file+headline "~/notes/todo.org" "Tasks")
         "* TODO Osta %?\n  %i\n")
        ("ö" "Random temp note to scratch outline" entry (file+headline "~/notes/todo.org" "Scratch")
         "* %?\n  %i\n")
        ("m" "Meeting / Appointment" entry (file+headline "~/notes/todo.org" "Appointments") "* TODO %?\n  %i\n")
        ("s" "Song" item (file+headline "~/notes/music.org" "New music")
         "%?\n  %i\n")
        ("j" "Journal entry" entry (file+datetree "~/notes/notetoself.org")
         "* %?\nEntered on %U\n  %i\n")
        ("d" "Dream" entry (file+headline "~/notes/notetoself.org" "Dreams") "* %U\n  %i\n%?")))

;; Set todo item states
(setq org-todo-keywords
      '((sequence "TODO(t)" "WAIT(w)" "|" "DONE(d)")))


;; (global-unset-key (kbd "<M-S-up>"))
;; (global-unset-key (kbd "<C-S-up>"))
;; (global-set-key (kbd "<M-S-up>") '(message "fuu"))
;; http://ergoemacs.org/emacs/emacs_set_keys_for_major_mode.html
(defun own-org-mode-hook ()
  "Modify keymaps and settings used by `org-mode'."

  (local-set-key (kbd "<H-up>") 'org-move-subtree-up) 
  (local-set-key (kbd "<H-down>") 'org-move-subtree-down) 
  
  
  ;; setup
  (org-indent-mode t)
  (visual-line-mode t)
  ;; Add syntax highlight to src blocks
  (setq org-src-fontify-natively t)

  (setq org-export-backends (quote (
                                    md
                                    ascii
                                    html
                                        ;latex
                                    odt)))
  )
;; Enable hook when org-mode starts
(add-hook 'org-mode-hook 'own-org-mode-hook)


;;; Python
(require 'elpy)
(elpy-enable)
;(elpy-enable) TODO: fix

(elpy-use-ipython)
(setq jedi:complete-on-dot t)

(add-hook 'python-mode-hook
          (lambda ()
            (abbrev-mode 1)
            (auto-fill-mode 1)
            (linum-mode 1)
            (jedi:setup)
            (if (eq window-system 'x)
                (font-lock-mode 1))))

;; HTML

(add-hook 'html-mode-hook
          (lambda()
            (setq sgml-basic-offset 4)
            t))

(defadvice sgml-delete-tag (after reindent-buffer activate)
  (prelude-cleanup-buffer))

;; Emmet
;(add-hook 'sgml-mode-hook 'emmet-mode)
(add-hook 'sgml-mode-hook
          (lambda ()
            (progn
              (emmet-mode)
              )))
(add-hook 'css-mode-hook  'emmet-mode)

(eval-after-load "emmet-mode"
  '(define-key emmet-mode-keymap (kbd "C-j") nil))

(add-hook 'emmet-mode-hook (lambda ()
                             (setq emmet-indentation 4)
                             (local-set-key (kbd "<backtab>") 'emmet-expand-line)))

(setq emmet-move-cursor-between-quotes t)

(defun unhtml (start end)
  (interactive "r")
  (save-excursion
    (save-restriction
      (narrow-to-region start end)
      (goto-char (point-min))
      (replace-string "&" "&amp;")
      (goto-char (point-min))
      (replace-string "<" "&lt;")
      (goto-char (point-min))
      (replace-string ">" "&gt;")
      )))

;; Javascript

;; js2-mode with autocomplete
(require 'js2-mode)
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))
(defun my-js2-mode-hook ()
"Custom keybindings for js2-mode"
  (define-key js2-mode-map [(meta control \;)] 
    '(lambda()
       (interactive)
       (insert "/* -----[ ")
       (save-excursion
         (insert " ]----- */"))
       ))
  (define-key js2-mode-map [(return)] 'newline-and-indent)
  (define-key js2-mode-map [(backspace)] 'c-electric-backspace)
  (define-key js2-mode-map [(control d)] 'c-electric-delete-forward)
  (message "My JS2 hook"))

(add-hook 'js2-mode-hook 'my-js2-mode-hook)
(add-hook 'js2-mode-hook 'ac-js2-mode)

;(define-key js2-mode-map [(backspace)] 'c-electric-backspace)

;; (define-key js2-mode-map [("C-c c")] 
(define-key js2-mode-map [(return)] 'newline-and-indent)
(define-key js2-mode-map [(backspace)] 'c-electric-backspace)
;; (define-key js2-mode-map [("C-c c")]
;;   '(lambda()
;;      (interactive)
;;      (insert "/* -----[ ")
;;      (save-excursion
;;        (insert " ]----- */"))
;;      ))


;; Lisp
(setq inferior-lisp-program "/usr/local/bin/clisp")

;; Haskell
;;(add-hook 'haskell-mode-hook 'turn-on-haskell-unicode-input-method)
(add-hook 'haskell-mode-hook 'turn-on-haskell-doc)
(add-hook 'haskell-mode-hook 'turn-on-haskell-indent)

;; Set tag browser
(add-hook 'haskell-mode-hook 'turn-on-haskell-decl-scan)
(add-hook 'haskell-mode-hook 'imenu-add-menubar-index)

(eval-after-load 'flycheck '(require 'flycheck-hdevtools))

;;Set REPL
;; (eval-after-load "haskell-mode"
;;   '(progn
;;      (define-key haskell-mode-map (kbd "C-x C-d") nil)
;;      (define-key haskell-mode-map (kbd "C-c C-z") 'haskell-interactive-switch)
;;      (define-key haskell-mode-map (kbd "C-c C-l") 'haskell-process-load-file)
;;      (define-key haskell-mode-map (kbd "C-c C-b") 'haskell-interactive-switch)
;;      (define-key haskell-mode-map (kbd "C-c C-t") 'haskell-process-do-type)
;;      (define-key haskell-mode-map (kbd "C-c C-i") 'haskell-process-do-info)
;;      (define-key haskell-mode-map (kbd "C-c M-.") nil)
;;      (define-key haskell-mode-map (kbd "C-c C-d") nil)))

;; (add-hook 'haskell-mode-hook 'turn-on-haskell-simple-indent)

;; (speedbar-add-supported-extension ".hs")
; setup ghc-mod
;; (autoload 'ghc-init "ghc" nil t)
;; (add-hook 'haskell-mode-hook (lambda () (ghc-init)))
;;; Other

                                        ; Latex
(add-hook 'LaTeX-mode-hook 'turn-on-reftex)
(setq reftex-plug-into-AUCTeX t)
(setq-default ispell-program-name "aspell")


(defun vi-open-line-above ()
  "Insert a newline above the current line and put point at beginning."
  (interactive)
  (unless (bolp)
    (beginning-of-line))
  (newline)
  (forward-line -1)
  (indent-according-to-mode))

(defun vi-open-line-below ()
  "Insert a newline below the current line and put point at beginning."
  (interactive)
  (unless (eolp)
    (end-of-line))
  (newline-and-indent))

(global-set-key (kbd "C-o") 'vi-open-line-below)

(global-set-key (kbd "C-S-o") 'vi-open-line-above)

;; http://demonastery.org/2013/04/emacs-narrow-to-region-indirect/
(defun narrow-to-region-indirect (start end)
  "Restrict editing in this buffer to the current region, indirectly."
  (interactive "r")
  (deactivate-mark)
  (let ((buf (clone-indirect-buffer nil nil)))
    (with-current-buffer buf
      (narrow-to-region start end))
    (switch-to-buffer buf)))
;;(global-set-key (kbd "C-c b") 'narrow-to-region-indirect)

;; Hide compilation buffer eg after sass scss compilation on file save
(defun bury-compile-buffer-if-successful (buffer string)
  "Bury a compilation BUFFER if succeeded without warnings."
  (if (and
       (string-match "compilation" (buffer-name buffer))
       (string-match "finished" string)
       (not
        (with-current-buffer buffer
          (search-forward "warning" nil t))))
      (run-with-timer 1 nil
                      (lambda (buf)
                        (bury-buffer buf)
                        (switch-to-prev-buffer (get-buffer-window buf) 'kill))
                      buffer)))
(add-hook 'compilation-finish-functions 'bury-compile-buffer-if-successful)


;; ;;"Quickly show 2 buffers next to eachother. TODO: fix
;; (defun horizontal-split ()
;;   (interactive "P")
;;   (delete-other-windows)
;;   (split-window-right)
;;   (next-buffer)
;;   (other-window)
;;   )

;; (define-key global-map (kbd "C-x 6") (lambda () (interactive) (horizontal-split)))

(provide 'emacsrc)

;;; emacsrc.el ends here
