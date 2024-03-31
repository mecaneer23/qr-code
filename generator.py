#!/usr/bin/env python3
"""Prompt the user for input and create qrcode.png"""

from qrcode.main import QRCode


def generate(data: str, output_filename: str = "qrcode") -> None:
    """Generate a qrcode holding `data` to `output_filename`.png"""
    qr = QRCode(version=1, box_size=10)
    qr.add_data(data)
    qr.make(fit=True)
    qr.make_image(fill="black", back_color="white").save(f"{output_filename}.png")


if __name__ == "__main__":
    generate(input("Input data (such as a website link or string of text): "))
