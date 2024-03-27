import {Option, Select} from "@mui/joy";
import {useTranslate} from "@tolgee/react";

type SelectUsersT = {
    handleChange: Function
}

export const SelectUsers = ({handleChange}: SelectUsersT) => {
    const {t} = useTranslate();
  return <div>
        <Select defaultValue={'rating'} onChange={handleChange}>
            <Option value={'rating'}>{t('Best.rating')}</Option>
            <Option value={'count'}>{t('Best.catch')}</Option>
        </Select>
    </div>
}
