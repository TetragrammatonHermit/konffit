 ;;; Org-mode
(global-set-key (kbd "H-c") 'org-capture)
(global-set-key (kbd "H-a") 'org-agenda)

(setq org-use-fast-todo-selection t)
(setq org-use-fast-tag-selection t)

;;(global-set-key "\C-c\C-cl" 'org-store-link)
;;(global-set-key "\C-c\C-cb " 'org-iswitchb)

(setq org-default-notes-file  "~/notes/todo.org")

(setq org-capture-templates
      '(("t" "Task / Chore" entry (file+headline "~/notes/gtd.org" "Tasks")
         "* TODO %?\n  %i\n")
        ("w" "Shout to Twitter / Blog" entry (file+headline "~/notes/todo.org" "Shouts")
         "* TODO %?\n  %i\n")
        ("i" "Idea" entry (file+headline "~/notes/someday.org" "Ideas")
         "* %?\n  %i\n")
        ("u" "Usuko task" entry (file+headline "~/notes/gtd.org" "Tasks / Todo")
         "* TODO %?\n  %i\n ")
        ("o" "Tweaks to OS" entry (file+headline "~/notes/someday.org" "OS Tweak") "* %?\n  %i\n")
        ("b" "Buy" entry (file+headline "~/notes/todo.org" "Tasks")
         "* TODO Osta %?\n  %i\n")
        ("ö" "Random temp note to scratch outline" entry (file+headline "~/notes/todo.org" "Scratch")
         "* %?\n  %i\n")
        ("m" "Meeting / Appointment" entry (file+headline "~/notes/gtd.org" "Tasks") "* APPT %?\n  %i\n")
        ("s" "Song" item (file+headline "~/notes/music.org" "New music")
         "%?\n  %i\n")
        ("j" "Journal entry" entry (file+datetree "~/notes/notetoself.org")
         "* %?\nEntered on %U\n  %i\n")
        ("d" "Dream" entry (file+headline "~/notes/notetoself.org" "Dreams") "* %U\n  %i\n%?")))


(setq org-agenda-custom-commands
      '(("c" "Desk Work" tags "HOME" ;; (1) (2) (3) (4)
         ((org-agenda-files '("~/notes/gtd.org")) ;; (5)
          (org-agenda-sorting-strategy '(priority-up effort-down))) ;; (5) cont.
         ("~/computer.html")) ;; (6)
        ;; ...other commands here
        ("H" "Office and Home Lists"
         ((agenda)
          (tags-todo "TOWN")
          (tags-todo "HOME")
          (tags-todo "PUTKILAHTI")
          (tags-todo "PC")
          (tags-todo "EVENING")))
        ("D" "Daily Action List"
         (
          (agenda "" ((org-agenda-ndays 1)
                      (org-agenda-sorting-strategy
                       (quote ((agenda time-up priority-down tag-up) )))
                      (org-deadline-warning-days 0)
                      ))))
        ))


(custom-set-variables
  ;; custom-set-variables was added by Custom.
  ;; If you edit it by hand, you could mess it up, so be careful.
  ;; Your init file should contain only one such instance.
  ;; If there is more than one, they won't work right.
 ;;'(auto-raise-tool-bar-buttons t t)
 ;;'(auto-resize-tool-bars t t)
 ;;'(calendar-week-start-day 1)
 ;;'(case-fold-search t)
 ;;'(current-language-environment "Latin-1")
 ;;'(default-input-method "latin-1-prefix")
 ;;'(make-backup-files nil)
 ;;'(normal-erase-is-backspace t)
 ;;'(org-agenda-files (quote ("c:/Charles/GTD/birthday.org" "c:/Charles/GTD/newgtd.org")))
 ;;'(org-agenda-ndays 7)
 ;;'(org-agenda-repeating-timestamp-show-all nil)
 ;;'(org-agenda-restore-windows-after-quit t)
 ;;'(org-agenda-show-all-dates t)
 ;;'(org-agenda-skip-deadline-if-done t)
 ;;'(org-agenda-skip-scheduled-if-done t)
 ;;'(org-agenda-sorting-strategy (quote ((agenda time-up priority-down tag-up) (todo tag-up))))
 ;;'(org-agenda-start-on-weekday nil)
 ;;'(org-agenda-todo-ignore-deadlines t)
 ;;'(org-agenda-todo-ignore-scheduled t)
 ;;'(org-agenda-todo-ignore-with-date t)
 ;;'(org-agenda-window-setup (quote other-window))
 ;;'(org-deadline-warning-days 7)
 ;;'(org-export-html-style "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyles.css\">")
 ;;'(org-fast-tag-selection-single-key nil)
 ;;'(org-log-done (quote (done)))
 '(org-refile-targets (quote (("gtd.org" :maxlevel . 1) ("someday.org" :level . 2))))
 ;;'(org-reverse-note-order nil)
 ;;'(org-tags-column -78)
 ;;'(org-tags-match-list-sublevels nil)
 ;;'(org-time-stamp-rounding-minutes 5)
 ;;'(org-use-fast-todo-selection t)
 ;;'(org-use-tag-inheritance nil)
 ;;'(unify-8859-on-encoding-mode t nil (ucs-tables))
 )



;;todo refile targets

;; (global-unset-key (kbd "<M-S-up>"))
;; (global-unset-key (kbd "<C-S-up>"))
;; (global-set-key (kbd "<M-S-up>") '(message "fuu"))
;; http://ergoemacs.org/emacs/emacs_set_keys_for_major_mode.html
(defun own-org-mode-hook ()
  "Modify keymaps and settings used by `org-mode'."

  (local-set-key (kbd "<H-up>") 'org-move-subtree-up)
  (local-set-key (kbd "<H-down>") 'org-move-subtree-down)

  ;; setup
  (setq org-catch-invisible-edits 'smart)
  (org-indent-mode t)
  (visual-line-mode t)

  ;; Add syntax highlight to src blocks
  (prelude-require-package 'htmlize)
  (setq org-src-fontify-natively t)

  (setq org-export-backends (quote (
                                    md
                                    ascii
                                    html
                                    latex
                                    odt)))
  )
;; Enable hook when org-mode starts
(add-hook 'org-mode-hook 'own-org-mode-hook)
