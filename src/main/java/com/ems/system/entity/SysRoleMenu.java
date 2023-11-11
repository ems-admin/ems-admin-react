package com.ems.system.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.ems.common.utils.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

/**
 * @program: ems-admin-boot
 * @description: this is a class
 * @author: starao
 * @create: 2021-11-27 13:27
 **/
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "sys_role_menu")
public class SysRoleMenu extends BaseEntity implements Serializable {

    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 角色ID
     */
    private Long roleId;

    /**
     * 菜单ID
     */
    private Long menuId;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
