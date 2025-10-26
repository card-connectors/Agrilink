#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_project.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Couldn't import Django. Activate venv and install requirements.") from exc
    execute_from_command_line(sys.argv)

if __name__ == "__main__":
    main()
