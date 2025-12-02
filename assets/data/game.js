// THAY / THÊM GAME Ở ĐÂY
// Mỗi object trong mảng GAMES là 1 game.

const GAMES = [
  {
    id: 1,
    name: 'Guardian Tales',
    platform: 'Mobile',
    version: 'v2.75+',
    status: 'Hoạt động', // 'Hoạt động' | 'Đang fix' | 'Mới thêm'
    tags: ['RPG', 'Action', 'Online'],
    description: 'Script ví dụ: damage, defense, speed, skill no cooldown... (bạn sửa theo script thật).',
    note: 'Điền lưu ý riêng cho game này (nếu có).',
    downloadUrl: 'https://t.me/YakultIpra'
  },
  {
    id: 2,
    name: 'The Battle Cats',
    platform: 'Mobile',
    version: 'v12.5+',
    status: 'Hoạt động',
    tags: ['Idle', 'Tower Defense'],
    description: 'Script ví dụ: money, cat food, win nhanh... (mô tả thực tế bạn tự chỉnh).',
    note: '',
    downloadUrl: 'https://t.me/YakultIpra'
  },
  {
    id: 3,
    name: 'The Spike Volleyball',
    platform: 'Mobile',
    version: 'v3.1+',
    status: 'Hoạt động',
    tags: ['Sports', 'Offline'],
    description: 'Script ví dụ: coin, jump, speed... (bạn tự update).',
    note: '',
    downloadUrl: 'https://t.me/YakultIpra'
  },
  {
    id: 4,
    name: 'Game demo đang fix',
    platform: 'Mobile',
    version: 'v1.0',
    status: 'Đang fix',
    tags: ['Demo'],
    description: 'Ví dụ card game đang fix script, bạn có thể dùng để báo trạng thái.',
    note: 'Hiện script chưa ổn định, vui lòng chờ bản update.',
    downloadUrl: 'https://t.me/YakultIpra'
  },
  {
    id: 5,
    name: 'Game demo mới thêm',
    platform: 'PC',
    version: 'v0.9',
    status: 'Mới thêm',
    tags: ['PC', 'New'],
    description: 'Game mới test, script còn đang thử nghiệm.',
    note: '',
    downloadUrl: 'https://t.me/YakultIpra'
  }
];

// Tạo thêm nhiều game giả lập để bạn thấy web hoạt động tốt với ~100 game.
// Bạn có thể xoá đoạn dưới nếu không cần.

for (let i = 6; i <= 40; i++) {
  GAMES.push({
    id: i,
    name: `Game demo #${i}`,
    platform: i % 3 === 0 ? 'PC' : i % 3 === 1 ? 'Mobile' : 'Emulator',
    version: `v${1 + (i % 5)}.0`,
    status: i % 3 === 0 ? 'Đang fix' : i % 5 === 0 ? 'Mới thêm' : 'Hoạt động',
    tags: ['Demo', 'Placeholder'],
    description: 'Game demo để bạn dễ hình dung khi có nhiều game trong danh sách. Thay bằng game thật của bạn.',
    note: '',
    downloadUrl: 'https://t.me/YakultIpra'
  });
}

// Bạn có thể tiếp tục push thêm tới 100+ game nếu muốn:
// for (let i = 41; i <= 100; i++) { ... }
