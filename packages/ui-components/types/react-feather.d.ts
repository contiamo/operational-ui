type ReactFeatherIconName =
  | "Activity"
  | "Airplay"
  | "AlertCircle"
  | "AlertOctagon"
  | "AlertTriangle"
  | "AlignCenter"
  | "AlignJustify"
  | "AlignLeft"
  | "AlignRight"
  | "Anchor"
  | "Aperture"
  | "ArrowDownLeft"
  | "ArrowDownRight"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUpLeft"
  | "ArrowUpRight"
  | "ArrowUp"
  | "AtSign"
  | "Award"
  | "BarChart2"
  | "BarChart"
  | "BatteryCharging"
  | "Battery"
  | "BellOff"
  | "Bell"
  | "Bluetooth"
  | "Bold"
  | "Book"
  | "Bookmark"
  | "Box"
  | "Briefcase"
  | "Calendar"
  | "CameraOff"
  | "Camera"
  | "Cast"
  | "CheckCircle"
  | "CheckSquare"
  | "Check"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronsDown"
  | "ChevronsLeft"
  | "ChevronsRight"
  | "ChevronsUp"
  | "Chrome"
  | "Circle"
  | "Clipboard"
  | "Clock"
  | "CloudDrizzle"
  | "CloudLightning"
  | "CloudOff"
  | "CloudRain"
  | "CloudSnow"
  | "Cloud"
  | "Codepen"
  | "Command"
  | "Compass"
  | "Copy"
  | "CornerDownLeft"
  | "CornerDownRight"
  | "CornerLeftDown"
  | "CornerLeftUp"
  | "CornerRightDown"
  | "CornerRightUp"
  | "CornerUpLeft"
  | "CornerUpRight"
  | "Cpu"
  | "CreditCard"
  | "Crop"
  | "Crosshair"
  | "Delete"
  | "Disc"
  | "DownloadCloud"
  | "Download"
  | "Droplet"
  | "Edit2"
  | "Edit3"
  | "Edit"
  | "ExternalLink"
  | "EyeOff"
  | "Eye"
  | "Facebook"
  | "FastForward"
  | "Feather"
  | "FileMinus"
  | "FilePlus"
  | "FileText"
  | "File"
  | "Film"
  | "Filter"
  | "Flag"
  | "Folder"
  | "Github"
  | "Gitlab"
  | "Globe"
  | "Grid"
  | "Hash"
  | "Headphones"
  | "Heart"
  | "HelpCircle"
  | "Home"
  | "Image"
  | "Inbox"
  | "Info"
  | "Instagram"
  | "Italic"
  | "Layers"
  | "Layout"
  | "LifeBuoy"
  | "Link2"
  | "Link"
  | "List"
  | "Loader"
  | "Lock"
  | "LogIn"
  | "LogOut"
  | "Mail"
  | "MapPin"
  | "Map"
  | "Maximize2"
  | "Maximize"
  | "Menu"
  | "MessageCircle"
  | "MessageSquare"
  | "MicOff"
  | "Mic"
  | "Minimize2"
  | "Minimize"
  | "MinusCircle"
  | "MinusSquare"
  | "Minus"
  | "Monitor"
  | "Moon"
  | "MoreHorizontal"
  | "MoreVertical"
  | "Move"
  | "Music"
  | "Navigation2"
  | "Navigation"
  | "Octagon"
  | "Package"
  | "Paperclip"
  | "PauseCircle"
  | "Pause"
  | "Percent"
  | "PhoneCall"
  | "PhoneForwarded"
  | "PhoneIncoming"
  | "PhoneMissed"
  | "PhoneOff"
  | "PhoneOutgoing"
  | "Phone"
  | "PieChart"
  | "PlayCircle"
  | "Play"
  | "PlusCircle"
  | "PlusSquare"
  | "Plus"
  | "Pocket"
  | "Power"
  | "Printer"
  | "Radio"
  | "RefreshCcw"
  | "RefreshCw"
  | "Repeat"
  | "Rewind"
  | "RotateCcw"
  | "RotateCw"
  | "Save"
  | "Scissors"
  | "Search"
  | "Server"
  | "Settings"
  | "Share2"
  | "Share"
  | "Shield"
  | "ShoppingCart"
  | "Shuffle"
  | "Sidebar"
  | "SkipBack"
  | "SkipForward"
  | "Slack"
  | "Slash"
  | "Sliders"
  | "Smartphone"
  | "Speaker"
  | "Square"
  | "Star"
  | "StopCircle"
  | "Sun"
  | "Sunrise"
  | "Sunset"
  | "Tablet"
  | "Tag"
  | "Target"
  | "Thermometer"
  | "ThumbsDown"
  | "ThumbsUp"
  | "ToggleLeft"
  | "ToggleRight"
  | "Trash2"
  | "Trash"
  | "TrendingDown"
  | "TrendingUp"
  | "Triangle"
  | "Tv"
  | "Twitter"
  | "Type"
  | "Umbrella"
  | "Underline"
  | "Unlock"
  | "UploadCloud"
  | "Upload"
  | "UserCheck"
  | "UserMinus"
  | "UserPlus"
  | "UserX"
  | "User"
  | "Users"
  | "VideoOff"
  | "Video"
  | "Voicemail"
  | "Volume1"
  | "Volume2"
  | "VolumeX"
  | "Volume"
  | "Watch"
  | "WifiOff"
  | "Wifi"
  | "Wind"
  | "XCircle"
  | "XSquare"
  | "X"
  | "Zap"
  | "ZoomIn"
  | "ZoomOut"

declare module "react-feather" {
  type ReactFeather = {
    [key: string]: any
  }

  export const Activity: any
  export const Airplay: any
  export const AlertCircle: any
  export const AlertOctagon: any
  export const AlertTriangle: any
  export const AlignCenter: any
  export const AlignJustify: any
  export const AlignLeft: any
  export const AlignRight: any
  export const Anchor: any
  export const Aperture: any
  export const ArrowDownLeft: any
  export const ArrowDownRight: any
  export const ArrowDown: any
  export const ArrowLeft: any
  export const ArrowRight: any
  export const ArrowUpLeft: any
  export const ArrowUpRight: any
  export const ArrowUp: any
  export const AtSign: any
  export const Award: any
  export const BarChart2: any
  export const BarChart: any
  export const BatteryCharging: any
  export const Battery: any
  export const BellOff: any
  export const Bell: any
  export const Bluetooth: any
  export const Bold: any
  export const Book: any
  export const Bookmark: any
  export const Box: any
  export const Briefcase: any
  export const Calendar: any
  export const CameraOff: any
  export const Camera: any
  export const Cast: any
  export const CheckCircle: any
  export const CheckSquare: any
  export const Check: any
  export const ChevronDown: any
  export const ChevronLeft: any
  export const ChevronRight: any
  export const ChevronUp: any
  export const ChevronsDown: any
  export const ChevronsLeft: any
  export const ChevronsRight: any
  export const ChevronsUp: any
  export const Chrome: any
  export const Circle: any
  export const Clipboard: any
  export const Clock: any
  export const CloudDrizzle: any
  export const CloudLightning: any
  export const CloudOff: any
  export const CloudRain: any
  export const CloudSnow: any
  export const Cloud: any
  export const Codepen: any
  export const Command: any
  export const Compass: any
  export const Copy: any
  export const CornerDownLeft: any
  export const CornerDownRight: any
  export const CornerLeftDown: any
  export const CornerLeftUp: any
  export const CornerRightDown: any
  export const CornerRightUp: any
  export const CornerUpLeft: any
  export const CornerUpRight: any
  export const Cpu: any
  export const CreditCard: any
  export const Crop: any
  export const Crosshair: any
  export const Delete: any
  export const Disc: any
  export const DownloadCloud: any
  export const Download: any
  export const Droplet: any
  export const Edit2: any
  export const Edit3: any
  export const Edit: any
  export const ExternalLink: any
  export const EyeOff: any
  export const Eye: any
  export const Facebook: any
  export const FastForward: any
  export const Feather: any
  export const FileMinus: any
  export const FilePlus: any
  export const FileText: any
  export const File: any
  export const Film: any
  export const Filter: any
  export const Flag: any
  export const Folder: any
  export const Github: any
  export const Gitlab: any
  export const Globe: any
  export const Grid: any
  export const Hash: any
  export const Headphones: any
  export const Heart: any
  export const HelpCircle: any
  export const Home: any
  export const Image: any
  export const Inbox: any
  export const Info: any
  export const Instagram: any
  export const Italic: any
  export const Layers: any
  export const Layout: any
  export const LifeBuoy: any
  export const Link2: any
  export const Link: any
  export const List: any
  export const Loader: any
  export const Lock: any
  export const LogIn: any
  export const LogOut: any
  export const Mail: any
  export const MapPin: any
  export const Map: any
  export const Maximize2: any
  export const Maximize: any
  export const Menu: any
  export const MessageCircle: any
  export const MessageSquare: any
  export const MicOff: any
  export const Mic: any
  export const Minimize2: any
  export const Minimize: any
  export const MinusCircle: any
  export const MinusSquare: any
  export const Minus: any
  export const Monitor: any
  export const Moon: any
  export const MoreHorizontal: any
  export const MoreVertical: any
  export const Move: any
  export const Music: any
  export const Navigation2: any
  export const Navigation: any
  export const Octagon: any
  export const Package: any
  export const Paperclip: any
  export const PauseCircle: any
  export const Pause: any
  export const Percent: any
  export const PhoneCall: any
  export const PhoneForwarded: any
  export const PhoneIncoming: any
  export const PhoneMissed: any
  export const PhoneOff: any
  export const PhoneOutgoing: any
  export const Phone: any
  export const PieChart: any
  export const PlayCircle: any
  export const Play: any
  export const PlusCircle: any
  export const PlusSquare: any
  export const Plus: any
  export const Pocket: any
  export const Power: any
  export const Printer: any
  export const Radio: any
  export const RefreshCcw: any
  export const RefreshCw: any
  export const Repeat: any
  export const Rewind: any
  export const RotateCcw: any
  export const RotateCw: any
  export const Save: any
  export const Scissors: any
  export const Search: any
  export const Server: any
  export const Settings: any
  export const Share2: any
  export const Share: any
  export const Shield: any
  export const ShoppingCart: any
  export const Shuffle: any
  export const Sidebar: any
  export const SkipBack: any
  export const SkipForward: any
  export const Slack: any
  export const Slash: any
  export const Sliders: any
  export const Smartphone: any
  export const Speaker: any
  export const Square: any
  export const Star: any
  export const StopCircle: any
  export const Sun: any
  export const Sunrise: any
  export const Sunset: any
  export const Tablet: any
  export const Tag: any
  export const Target: any
  export const Thermometer: any
  export const ThumbsDown: any
  export const ThumbsUp: any
  export const ToggleLeft: any
  export const ToggleRight: any
  export const Trash2: any
  export const Trash: any
  export const TrendingDown: any
  export const TrendingUp: any
  export const Triangle: any
  export const Tv: any
  export const Twitter: any
  export const Type: any
  export const Umbrella: any
  export const Underline: any
  export const Unlock: any
  export const UploadCloud: any
  export const Upload: any
  export const UserCheck: any
  export const UserMinus: any
  export const UserPlus: any
  export const UserX: any
  export const User: any
  export const Users: any
  export const VideoOff: any
  export const Video: any
  export const Voicemail: any
  export const Volume1: any
  export const Volume2: any
  export const VolumeX: any
  export const Volume: any
  export const Watch: any
  export const WifiOff: any
  export const Wifi: any
  export const Wind: any
  export const XCircle: any
  export const XSquare: any
  export const X: any
  export const Zap: any
  export const ZoomIn: any
  export const ZoomOut: any
}
