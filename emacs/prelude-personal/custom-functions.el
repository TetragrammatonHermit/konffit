(defun transparency (value)
  "Set the transparency of the frame window.  VALUE = 0-100."
  (interactive "nTransparency Value 0 - 100 opaque:")
  (set-frame-parameter (selected-frame) 'alpha value))

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
;; (add-hook 'compilation-finish-functions 'bury-compile-buffer-if-successful)

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



;; Vim-ish C-o binding

;; Prelude has S-RET/M-o and C-S-RET/Super-o
;; (defun vi-open-line-above ()
;;   "Insert a newline above the current line and put point at beginning."
;;   (interactive)
;;   (unless (bolp)
;;     (beginning-of-line))
;;   (newline)
;;   (forward-line -1)
;;   (indent-according-to-mode))
;; (define-key global-map (kbd "C-S-o") 'vi-open-line-above)


;; (defun vi-open-line-below ()
;;   "Insert a newline below the current line and put point at beginning."
;;   (interactive)
;;   (unless (eolp)
;;     (end-of-line))
;;   (newline-and-indent))
;; (define-key global-map (kbd "C-o") 'vi-open-line-below)

