;;; elpy-autoloads.el --- automatically extracted autoloads
;;
;;; Code:


;;;### (autoloads (elpy-mode elpy-disable elpy-enable) "../../../konffit/emacs/.emacs.d/elpa/elpy-20130719.2030/elpy"
;;;;;;  "elpy.el" "c4a2da9c206342eaea49ce84d119e11d")
;;; Generated autoloads from elpy.el

(autoload 'elpy-enable "../../../konffit/emacs/.emacs.d/elpa/elpy-20130719.2030/elpy" "\
Enable Elpy in all future Python buffers.

When SKIP-INITIALIZE-VARIABLES is non-nil, this will NOT call
`elpy-initialize-variables' to configure various modes in a way
that the Elpy author considers sensible. If you'd rather
configure those modes yourself, pass t here.

\(fn &optional SKIP-INITIALIZE-VARIABLES)" t nil)

(autoload 'elpy-disable "../../../konffit/emacs/.emacs.d/elpa/elpy-20130719.2030/elpy" "\
Disable Elpy in all future Python buffers.

\(fn)" t nil)

(autoload 'elpy-mode "../../../konffit/emacs/.emacs.d/elpa/elpy-20130719.2030/elpy" "\
Minor mode in Python buffers for the Emacs Lisp Python Environment.

This mode fully supports virtualenvs. Once you switch a
virtualenv using \\[virtualenv-workon], you can use
\\[elpy-rpc-restart] to make the elpy Python process use your
virtualenv.

See https://github.com/jorgenschaefer/elpy/wiki/Keybindings for a
more structured list.

\\{elpy-mode-map}

\(fn &optional ARG)" t nil)

;;;***

;;;### (autoloads (elpy-mode elpy-disable elpy-enable) "elpy" "../../../../../.emacs.d/elpa/elpy-20130719.2030/elpy.el"
;;;;;;  "c4a2da9c206342eaea49ce84d119e11d")
;;; Generated autoloads from ../../../../../.emacs.d/elpa/elpy-20130719.2030/elpy.el

(autoload 'elpy-enable "elpy" "\
Enable Elpy in all future Python buffers.

When SKIP-INITIALIZE-VARIABLES is non-nil, this will NOT call
`elpy-initialize-variables' to configure various modes in a way
that the Elpy author considers sensible. If you'd rather
configure those modes yourself, pass t here.

\(fn &optional SKIP-INITIALIZE-VARIABLES)" t nil)

(autoload 'elpy-disable "elpy" "\
Disable Elpy in all future Python buffers.

\(fn)" t nil)

(autoload 'elpy-mode "elpy" "\
Minor mode in Python buffers for the Emacs Lisp Python Environment.

This mode fully supports virtualenvs. Once you switch a
virtualenv using \\[virtualenv-workon], you can use
\\[elpy-rpc-restart] to make the elpy Python process use your
virtualenv.

See https://github.com/jorgenschaefer/elpy/wiki/Keybindings for a
more structured list.

\\{elpy-mode-map}

\(fn &optional ARG)" t nil)

;;;***

;;;### (autoloads nil nil ("../../../../../.emacs.d/elpa/elpy-20130719.2030/elpy-autoloads.el"
;;;;;;  "../../../../../.emacs.d/elpa/elpy-20130719.2030/elpy-pkg.el"
;;;;;;  "../../../../../.emacs.d/elpa/elpy-20130719.2030/elpy-refactor.el"
;;;;;;  "../../../../../.emacs.d/elpa/elpy-20130719.2030/elpy.el"
;;;;;;  "elpy.el") (20998 14115 423940 0))

;;;***

(provide 'elpy-autoloads)
;; Local Variables:
;; version-control: never
;; no-byte-compile: t
;; no-update-autoloads: t
;; coding: utf-8
;; End:
;;; elpy-autoloads.el ends here
