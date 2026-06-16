# Hunter_LS
PCB implementation for Hunter Xcore irrigation system.

# Background 
Hunter XCORE is a  "dumb" system that can be locally programmed but no iOT connection is provided by Hunter. 
Solutions li like (https://github.com/marek-polak/hunter-wifi) can be implemented in homeassistant but lack active status feedback of the valves, without it ins uncertain if system was effectivelly started or not.

# Somebody worked on it already ...  
A great job was done by CZSmith at (https://github.com/czsmith/HunterMonitor) laying down the schematics for a working PCB but hardware was not available so i was up for the challange.

# The challange 
The oportunity was taken to develop a PCB.
Idea was a seamless integration into the Hunter XCORE. 

# PCB 
PCB was designed to fit the case, wave possibility to be integrated without any modification of the system. 
Design follows the schematic from CZSmith.
Through hole was the way to go, spece was not a problem and idea was to learn, solder and integrate all at home.
PCB supplied by JLC PCB.

# Software 
Managed through ESPHome as per (https://github.com/czsmith/HunterMonitor).
On new board V2.0.0 Software above was fully converted to be compatible with XAIO ESP32C6

# Possible improvements
V1.0.0 comes with some "issues"
  1) Power labels and comments should been done in brighter color, not easy to read.
  2) Mistake on footprint definition of 2W10 - currently 90º rotated part vs graphic description.
  3) Hole for antena in left side of PCB its useless as antena wiring would not fit the case - Idea not practical.
  4) Rearragne components if possible to allow space for full usb cable to fit - currently only short cable/angled cable is possible.

# 07/10/2025
# Updated version 1.1.0  
V1.1.0 comes with the following improvements:
  1) New DC-DC converter with wider input range. V1.0.0 DC-DC converter would not work depending on component supplier quality. This new component solves the topic.
  2) Power labels and comments improved with bright color and its now a lot easier to read.
  3) Footprint of 2W10 corrected
  4) Useless hole for antena removed
  5) Removed shunt of VAC-L and Zone C as it was useless
  6) New board color BLUE

V1.1.0
![image](https://github.com/luisfosoares/Hunter_LS/blob/main/V1.1.0.jpg)

# 11/05/2026
# Updated version 1.1.1
V1.1.1 comes with the following improvements:
  1) Improved PCB traces
  2) Removed back support for PSU
  3) New board color RED

V1.1.1
![image](https://github.com/luisfosoares/Hunter_LS/blob/main/V1.1.1.jpeg)

# 16/06/2026
# Updated version 2.0.0
After being challanged to upgrade the board to up to 8 zones i have decided to release this new version, it was a tight fit but no change in any dimension.
V2.0.0 comes with the following improvements:
  1) New controller - XAIO ESP32C6
  2) Better performance
  3) Better wifi signal
  4) Up to 8 zones instead of 4
  5) Added back support for PSU again for stability 
  6) New board color BLACK
     
V2.0.0
![image](https://github.com/luisfosoares/Hunter_LS/blob/main/V2.0.0.jpg)

# Pictures of PCB and installation. 
(Pictures from v1.0.0 but works the same on V1.1.0, V1.1.1 or 2.0.0 - Just follow the labels on the pins of the board)
![image](https://github.com/user-attachments/assets/8abcf170-1876-4fbc-9b6d-4df3dc87784c)
![image](https://github.com/user-attachments/assets/0026dabc-cd52-4feb-be6b-f23143dd2b9e)
![image](https://github.com/user-attachments/assets/44e539b3-e559-4ddc-aaa5-a5bc3d83cabb)
![image](https://github.com/user-attachments/assets/14568da3-a0c9-467b-8901-e5f2e5959b70)
![image](https://github.com/user-attachments/assets/2496b162-fd1f-484b-a2dd-0d603f6e1615)
![image](https://github.com/user-attachments/assets/9290a2b2-218d-46c9-9a58-84029e065b5a)
![image](https://github.com/user-attachments/assets/161a6718-c6a4-4e6c-9298-dddae5da64cf)

# Interest from others 
If you are interested in this kind of item please contact me on (filipee8.net@gmail.com).

# Thanks
Thanks to CZSmith for the inital Schematic.



