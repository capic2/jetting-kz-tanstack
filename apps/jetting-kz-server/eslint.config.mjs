import baseConfig from '../../eslint.base.config.mjs';

export default [...baseConfig, { ignores: ['src/generated/**'] }];
