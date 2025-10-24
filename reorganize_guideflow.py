#!/usr/bin/env python3
"""
Script to reorganize GuideFlowApendicite.tsx from 3 etapas to 7 etapas
"""

import re

# Read the original file
with open(r'C:\Users\joaov\SurgFlow 1.0\SurgFlow\src\components\guidelines\GuideFlowApendicite.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("File read successfully. Total length:", len(content))
print("\nSearching for key sections...")

# Find the key section markers
markers = {
    'renderEtapa1_start': re.search(r'(  const renderEtapa1 = \(\) => \()', content),
    'renderEtapa2_start': re.search(r'(  const renderEtapa2 = \(\) => \()', content),
    'renderEtapa3_start': re.search(r'(  const renderEtapa3 = \(\) => \()', content),
    'return_section': re.search(r'(  return \(\n    <div className="space-y-6">)', content),
}

for name, match in markers.items():
    if match:
        print(f"{name}: Found at position {match.start()}")
    else:
        print(f"{name}: NOT FOUND")

# Find end of each renderEtapa function (looking for the closing of the function)
# renderEtapa1 ends where renderEtapa2 starts
# renderEtapa2 ends where renderEtapa3 starts
# renderEtapa3 ends where return statement starts

if all(markers.values()):
    etapa1_end = markers['renderEtapa2_start'].start()
    etapa2_end = markers['renderEtapa3_start'].start()
    etapa3_end = markers['return_section'].start()

    print(f"\nEtapa 1: {markers['renderEtapa1_start'].start()} - {etapa1_end}")
    print(f"Etapa 2: {markers['renderEtapa2_start'].start()} - {etapa2_end}")
    print(f"Etapa 3: {markers['renderEtapa3_start'].start()} - {etapa3_end}")
